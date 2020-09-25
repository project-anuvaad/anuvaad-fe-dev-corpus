var jp                  = require('jsonpath')

function get_block_id(blocks) {
    let block_ids = []
    blocks.forEach(element => {
        block_ids.push(element.split('_')[0])
    });
    return block_ids
}

function get_page_id(blocks) {
    let page_ids = []
    blocks.forEach(element => {
        page_ids.push(parseInt(element.split('_')[1]))
    });
    return page_ids
}

function get_blocks(sentences, block_ids) {
    let blocks = []
    block_ids.forEach(element => {
        let condition           = '$..[*].text_blocks[?(@.block_id ==' + '\'' + element + '\'' + ')]'
        let selected_blocks     = jp.query(sentences, condition)

        selected_blocks.forEach(element => {

            element.children.forEach(child => {
                child.page_no = element.page_info.page_no
            })
            blocks.push(element)
        })

    })
    return blocks
}

/**
 * @description sorts the block based upon the largest area and return the largest area block
 * @param {*} selected blocks
 */
function get_largest_area_block(blocks) {
    let descending_areas = blocks.sort((a, b) => {
        if ((a.text_width * a.text_height) > (b.text_width * b.text_height)) {
            return -1
        }
        if ((a.text_width * a.text_height) < (b.text_width * b.text_height)) {
            return 1
        }
        return 0
    })

    return descending_areas[0]
}

/**
 * @description sorts the children block based upon top, left & page number, concatenates the text present in the children
 * @param {*} blocks selected blocks
 */
function get_concatenated_text(blocks) {
    let condition   = '$..children[*]'
    let children    = jp.query(blocks, condition)

    let sorted_blocks      = children.sort((a, b) => {
        if (a.page_no > b.page_no) {
            return 1
        }
        if (a.page_no < b.page_no) {
            return -1
        }
        if (a.text_top < b.text_top) {
            return -1
        }
        if (a.text_top > b.text_top) {
            return 1
        }
        if (a.text_left > b.text_left) {
            return 1
        }
        if (a.text_left < b.text_left) {
            return -1
        }
        return 0
    })

    let texts       = []
    sorted_blocks.forEach(element => {
        texts.push(element.text)
    })

    return texts.join(' ')
}

/**
 *
 * @param {*} sentences, list of all the sentences in which merge operation has to be performed
 * @param {*} selected_block_ids, selected block_ids
 */
function get_merged_blocks(sentences, selected_block_ids) {
    let selected_blocks     = get_blocks(sentences, get_block_id(selected_block_ids))
    let largest_block       = get_largest_area_block(selected_blocks)
    let text                = get_concatenated_text(selected_blocks)

    let updated_blocks      = []

    selected_blocks.forEach(element => {
        if (element.block_identifier == largest_block.block_identifier) {
            element.text    = text

        } else {
            element.text                = null
            element.tokenized_sentences = []
        }
        element.block_id = largest_block.block_id
        element.has_sibling = true
        updated_blocks.push(element)
    })

    return updated_blocks;
}

/**
 * @description returns a block that actually has "tokenized_sentences" by checking length
 * @param {*} blocks, select list of blocks that have same block_id
 */
function get_tokenized_sentences_block(blocks) {
    blocks.forEach(element => {
        if (element.tokenized_sentences && element.tokenized_sentences.length > 0) {
            return element
        }
    })
    return null
}

/**
 * @description finds index of sentence_id
 * @param {*} tokenized_sentences, holds all the sentences
 * @param {*} sentence_id, sentence whose index needs to be determined
 *
 * @returns index of sentence_id
 */
function get_sentence_id_index(tokenized_sentences, sentence_id) {
    tokenized_sentences.forEach((element, index) => {
        if (element.sentence_id == sentence_id) {
            return index
        }
    })
}

/**
 * @description merges the source sentences between sentence_id that is present at the lowest index of the
 *              tokenized sentence in asending order of indices.
 * @param {*} sentences, list of all the sentences in which merge operation has to be performed
 * @param {*} block_id, operation performed on specific block
 * @param {*} sentence_id_1, start selection index
 * @param {*} sentence_id_2,  end selection index
 */
function do_sentences_merging(sentences, block_id, sentence_id_1, sentence_id_2) {
    let selected_block_ids         = []
    selected_block_ids.push(block_id)

    let selected_blocks             = get_blocks(sentences, get_block_id(selected_block_ids))
    let tokenized_sentences_block   = get_tokenized_sentences_block(selected_blocks)
    let index1                      = get_sentence_id_index(tokenized_sentences_block.tokenized_sentences, sentence_id_1)
    let index2                      = get_sentence_id_index(tokenized_sentences_block.tokenized_sentences, sentence_id_2)
    let start                       = null
    let end                         = null

    if (index1 > index2) {
        start   = index2
        end     = index1
    } else {
        start   = index1
        end     = index2
    }

    let first_sentences_part  = tokenized_sentences_block.slice(0, start)
    let second_sentences_part = tokenized_sentences_block.slice(start, end)
    let third_sentences_part  = tokenized_sentences_block.slice(end, tokenized_sentences_block.length)

    let final_tokenized_sentences = []
    first_sentences_part.forEach((e) => final_tokenized_sentences.push(e))
    final_tokenized_sentences.push(second_sentences_part.join(''))
    third_sentences_part.forEach((e) => final_tokenized_sentences.push(e))

    tokenized_sentences_block.tokenized_sentences = final_tokenized_sentences
    return tokenized_sentences_block
}

module.exports = {
    get_merged_blocks,
    do_sentences_merging
}
