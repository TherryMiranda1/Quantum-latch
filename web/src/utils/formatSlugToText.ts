export const formatSlugToText = (slug: string) => slug.replace(/-/g, " ");

export const formatTextToSlug = (text: string) => text.replace(/ /g, "-");