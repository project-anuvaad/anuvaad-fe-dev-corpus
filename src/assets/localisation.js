var localization_EN_Data = {
    'dashboard.page.heading.message': 'Translate',
    'common.page.label.source': 'Please select source language',
    'common.page.label.target':'Please select target language',
    'common.page.button.submit' : 'submit',
    'common.page.button.clear' : 'clear',
    'dashboard.page.checkbox.mt':"Machine Translated",
    'dashboard.page.checkbox.splitted':"Show , splitted",
    'dashboard.page.checkbox.ioSubwords':"Input and Output Subwords",
    'neworders.page.label.inputSubwords':"Input Subwords",
    'neworders.page.label.outputSubwords' :'Output Subwords',
    'common.page.button.cancel':'Cancel',
    'common.page.button.next':'Next',
    'common.page.error.nameError':"Name shouldn't be empty",
    'common.page.error.domainError':"Domain shouldn't be empty",
    'common.page.error.commentError':"Comment Shouldn't be empty",
    'common.page.label.addDropFile':"Please Add/Drop pdf file here",
    'common.page.label.pageWarning':" * Fields shouldn't be empty ",
    'common.page.label.enterWorkspace':"Enter workspace name :",
    'newSentenceExtraction.page.label.confiFile':"Configuration file :",
    'newSentenceExtraction.page.label.downloadGlobalConfi':"Download global configuration",
    'common.page.button.upload':"Upload",
    'newSentenceExtraction.page.label.csvFile':"CSV file :",
    'newSentenceExtraction.page.label.downloadSampleCsv':"Download sample csv",
    'common.page.button.start':"Start processing",
    'sentenceExtraction.page.label.ExtractedSent':"Extracted sentences :",
    'common.page.button.download&View':"Download & View",
    'tockenExtraction.page.label.enterPositiveTocken':"Extracted positive tokens :",
    'tockenExtraction.page.label.foundTocken':"Found 0 tokens",
    'tockenExtraction.page.label.enterNegativeTocken':"Extracted negative tokens :",
    'common.page.label.workSpaceName':"Workspace name :",
    'common.page.label.positiveTocken':"Positive tokens :",
    'uploadTocken.page.label.negativeTocken':"Negative tokens :",
    'uploadTocken.page.label.or':"or",
    'common.page.button.applyFilter':"Apply Filters",
    'common.page.label.message':'Process started, This might be long running operation, kindly look the status of your workspace under "Processing Workspace" tab',
    'common.page.label.csvData':"Please upload CSV file containing paragraphs (check with development team about the file format). Start by download global configuration file and provide workspace name.",
    'common.page.label.processData':'Press "Start processing" to run the workspace. This might be long running operation, kindly look the status of your workspace under "Processing Workspace" tab',
    'common.page.table.createdAt': 'Created At',
    "common.page.table.status":'Status',
    "common.page.table.username":'Created By',
    "common.page.table.workspace":'Workspace',
    'common.tools.title.processingWorkspaces':"Processing Workspaces",
    "common.page.table.step":"step",
    "common.page.table.sentenceCount":"Sentence Count",
    "common.page.table.existingWorkspace":"Existing Workspaces",
    'common.page.data.dataSource':"Data Source",
    'common.page.message1.fileAdded':'file added successfully',
    'common.page.processData.pressNextToSelect':'Press "Next" to select relevant input workspaces',
    'common.page.button.back':"Back",
    'common.page.label.addDataSource':"Add DataSource",
    'common.page.processData.pressNext':'Press "Next" to extract sentences',
    'common.page.label.found':' Found',
    'common.page.label.tokens':'tockens',
    'common.page.processData.gotoStep2':'Press "Next" to goto Step 2',
    'common.page.message.step2Completed':"Step 2 process started successfully ",
    'common.page.alert.fileUpload':"Please upload token file properly",
    'common.page.select.fromPrevious':"Select from previous"



}


export function translate(locale_text) {
    // if (locale_text && localStorage.getItem('lang_response')) {
    //     var langresult = JSON.parse(localStorage.getItem('lang_response')).filter(function (obj) {
    //         return obj.code == locale_text;
    //     });
    //     if (langresult[0]) return Object.values(langresult[0])[1];
    //     else return localStorage.locale == 'mr_IN' ? localization_MR_Data[locale_text] || locale_text : localization_EN_Data[locale_text] || locale_text;
    // }
    return localization_EN_Data[locale_text] || locale_text
}