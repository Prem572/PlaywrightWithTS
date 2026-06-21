import {DataTable} from '@cucumber/cucumber';

export function dataTableToMapConverter(dataTable:DataTable): Map<string, string> { 

    const eventDetails = dataTable.rowsHash();
    const configMap = new Map<string, string>(Object.entries(eventDetails));
    return configMap;
}