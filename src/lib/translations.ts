export type Language = 'en' | 'et';

export const translations = {
  en: {
    // Tab Bar
    newTab: 'New tab',
    closeTab: 'Close tab',
    deleteConfirm: (name: string) => `Delete '${name}'? This cannot be undone.`,

    // Theme & Language
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',

    // Console
    openConsole: 'Open Serial Console',
    console: 'Console',
    serialConsole: 'Serial Console',
    connect: 'Connect',
    disconnect: 'Disconnect',
    disconnected: 'Disconnected',
    connecting: 'Connecting',
    connected: (baud: number) => `Connected at ${baud} baud`,
    requestingPort: 'Requesting port...',
    connectionFailed: 'Connection failed',
    clear: 'Clear',
    send: 'Send',
    typeCommand: 'Type command and press Enter...',
    clickConnect: 'Click Connect to open a serial port connection...',
    webSerialNotSupported: 'ERROR: Web Serial API not supported in this browser. Use Chrome, Edge, or Opera.',
    notConnected: 'ERROR: Not connected to serial port',
    serialTip: 'Tip: Use Chrome, Edge, or Opera for serial support',

    // Config Input
    configTemplate: 'Configuration Template',
    configTooltip: (syntax: string) => `Paste your config here. Replace values with variables like {{ hostname }} - they show in ${syntax}.`,
    noHighlighting: 'No Highlighting',
    syntaxMode: 'Choose syntax highlighting mode',
    addVariable: '+ Add Variable',
    addVariableTooltip: 'Add variable at cursor position - saves typing {{ }}',
    enterVariableName: 'Enter variable name:',
    pasteConfig: 'Paste your network configuration here.',
    useVariables: 'Use {{ variableName }} for values you want to replace.',
    example: 'Example:',

    // Variables Panel
    variables: 'Variables',
    variablesTooltip: 'Variables are auto-detected from your config. Type {{ name }} in the editor to create them.',
    noVariables: 'No variables detected. Use {{ variableName }} in your configuration.',
    enterValue: (varName: string) => `Enter value for ${varName}`,

    // Line Spacing
    lineSpacing: (lines: number) => `Insert blank line every ${lines} lines`,
    lineSpacingTooltip: 'Adds blank lines to your output for better readability. Changes apply instantly!',

    // Generation
    generateConfig: 'Generate Configuration',
    generating: 'Generating...',
    warningUndefined: 'Warning: The following variables are undefined:',

    // Output
    generatedOutput: 'Generated Output',
    clickGenerate: 'Click Generate to see output',
    filename: 'filename.txt',
    download: 'Download',
    copyToClipboard: 'Copy to Clipboard',

    // Documentation
    docs: 'Docs',
    openDocs: 'Open Documentation',
    documentation: 'EasyConf Documentation',

    // Empty State
    createFirstConfig: 'Create your first configuration',
    getStarted: 'Get started by creating a new tab',
    createTab: 'Create Tab',

    // Footer
    footer: 'Vibecoded by karlmagi',
  },
  et: {
    // Tab Bar
    newTab: 'Uus vaheldukas',
    closeTab: 'Sulge vahevahekaart',
    deleteConfirm: (name: string) => `Kustuta '${name}'? Seda ei saa tagasi võtta.`,

    // Theme & Language
    switchToLight: 'Lülitu heleda režiimi',
    switchToDark: 'Lülitu tumeda režiimi',
    light: 'Hele',
    dark: 'Tume',
    language: 'Keel',

    // Console
    openConsole: 'Ava jadakonsool',
    console: 'Konsool',
    serialConsole: 'Jadakonsool',
    connect: 'Ühenda',
    disconnect: 'Katkesta',
    disconnected: 'Ühendus puudub',
    connecting: 'Ühendumine',
    connected: (baud: number) => `Ühendatud ${baud} baud kiirusega`,
    requestingPort: 'Pordi pärimine...',
    connectionFailed: 'Ühendamine ebaõnnestus',
    clear: 'Puhasta',
    send: 'Saada',
    typeCommand: 'Kirjuta käsk ja vajuta Enter...',
    clickConnect: 'Vajuta Ühenda, et avada jadaport...',
    webSerialNotSupported: 'VIGA: Web Serial API pole selles brauseris toetatud. Kasuta Chrome, Edge või Opera brauserit.',
    notConnected: 'VIGA: Jadaport pole ühendatud',
    serialTip: 'Vihje: Kasuta jadapordi toeks Chrome, Edge või Opera brauserit',

    // Config Input
    configTemplate: 'Konfiguratsioonimall',
    configTooltip: (syntax: string) => `Kleebi siia oma konfiguratsioon. Asenda väärtused muutujatega nagu {{ hostname }} - need kuvatakse ${syntax}.`,
    noHighlighting: 'Ilma esiletõstuta',
    syntaxMode: 'Vali süntaksi esiletõstmise režiim',
    addVariable: '+ Lisa muutuja',
    addVariableTooltip: 'Lisa muutuja kursori asukohta - säästab {{ }} kirjutamist',
    enterVariableName: 'Sisesta muutuja nimi:',
    pasteConfig: 'Kleebi siia oma võrgukonfiguratsioon.',
    useVariables: 'Kasuta {{ muutujaNimi }} asendatavate väärtuste jaoks.',
    example: 'Näide:',

    // Variables Panel
    variables: 'Muutujad',
    variablesTooltip: 'Muutujad tuvastatakse automaatselt sinu konfiguratsioonist. Kirjuta {{ nimi }} redaktorisse, et neid luua.',
    noVariables: 'Muutujaid ei tuvastatud. Kasuta {{ muutujaNimi }} oma konfiguratsioonis.',
    enterValue: (varName: string) => `Sisesta väärtus ${varName} jaoks`,

    // Line Spacing
    lineSpacing: (lines: number) => `Lisa tühi rida iga ${lines} rea järel`,
    lineSpacingTooltip: 'Lisab väljundisse tühje ridu parema loetavuse jaoks. Muudatused rakenduvad koheselt!',

    // Generation
    generateConfig: 'Genereeri konfiguratsioon',
    generating: 'Genereerimine...',
    warningUndefined: 'Hoiatus: Järgmised muutujad on defineerimata:',

    // Output
    generatedOutput: 'Genereeritud väljund',
    clickGenerate: 'Vajuta Genereeri, et näha väljundit',
    filename: 'failinimi.txt',
    download: 'Laadi alla',
    copyToClipboard: 'Kopeeri lõikelauale',

    // Documentation
    docs: 'Dokud',
    openDocs: 'Ava dokumentatsioon',
    documentation: 'EasyConf dokumentatsioon',

    // Empty State
    createFirstConfig: 'Loo oma esimene konfiguratsioon',
    getStarted: 'Alusta uue vahekaardi loomisega',
    createTab: 'Loo vahekaart',

    // Footer
    footer: 'Vibecoded karlmagi poolt',
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations.en): any {
  return translations[lang][key];
}
