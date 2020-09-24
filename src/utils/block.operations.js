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
        let condition           = '$.data[*].text_blocks[?(@.block_id ==' + '\'' + element + '\'' + ')]'
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
function get_largest_area_block_id(blocks) {
    let descending_areas = blocks.sort((a, b) => {
        if ((a.text_width * a.text_height) > (b.text_width * b.text_height)) {
            return -1
        }
        if ((a.text_width * a.text_height) < (b.text_width * b.text_height)) {
            return 1
        }
        return 0
    })
    return descending_areas[0]['block_id']
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
        if (a.text_top > b.text_top) {
            return -1
        }
        if (a.text_top < b.text_top) {
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

function get_merged_blocks(sentences, selected_block_ids) {
    let selected_blocks     = get_blocks(sentences, get_block_id(selected_block_ids))
    let largest_block_id    = get_largest_area_block_id(selected_blocks)
    let text                = get_concatenated_text(selected_blocks)

    let updated_blocks      = []
    selected_blocks.forEach(element => {
        if (element.block_id == largest_block_id) {
            element.text    = text
        } else {
            element.text                = null
            element.tokenized_sentences = []
        }
        updated_blocks.push(element)
    })

    return updated_blocks;
}

module.exports = {
    get_merged_blocks
}
