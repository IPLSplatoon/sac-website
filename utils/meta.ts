import { isBlank } from '~/utils/string';

export function buildMetaTags({ title, description, imageUrl }: { title: string, description?: string, imageUrl?: string }): Array<Record<string, unknown>> {
    return [
        { name: 'title', content: title },
        { name: 'description', content: description },

        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },

        { name: 'twitter:card', content: 'summary' },
        { property: 'twitter:title', content: title },

        ...(isBlank(description) ? [] : [
            { property: 'og:description', content: description },
            { property: 'twitter:description', content: description },
        ]),

        ...(isBlank(imageUrl) ? [] : [
            { content: imageUrl, property: 'og:image' },
            { property: 'twitter:image', content: imageUrl }
        ])
    ];
}
