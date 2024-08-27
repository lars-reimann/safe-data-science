import type { Call, GenericExpression } from '$global';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategory = (call: Call) => {
    // Todo: Proper mapping method
    const categoryList = [
        'modelevaluation',
        'dataexport',
        'dataimport',
        'modeling',
        'dataprocessing',
        'dataexploration',
    ];
    const i = Math.floor(Math.random() * categoryList.length);
    return categoryList[i];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getType = (genericExpression: GenericExpression) => {
    // Todo: Proper mapping method
    const datatypeList = ['lambda', 'number', 'string', 'table'];
    const i = Math.floor(Math.random() * datatypeList.length);
    return datatypeList[i];
};
