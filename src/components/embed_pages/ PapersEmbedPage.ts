import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';
import * as papers from '../../../assets/bibliography_links.json';
import { EmbedFieldData } from 'discord.js';

export const data = new EmbedPage(
    client,
    true,
    true,
    false,
    'papers',
    'Lista de lecturas obligatorias',
    'Links a papers',
    [client.config.papersTextChannelID],
    paperLinksFields()
);

function paperLinksFields(): EmbedFieldData[] {
    const papersFields: EmbedFieldData[] = [];

    for (const i in papers) {
        const paper = papers[i];
        if (i != 'default') {
            papersFields.push({
                name: '\u200B',
                value: `[${paper.name}](${paper.url})`,
            });
        }
    }

    return papersFields;
}
