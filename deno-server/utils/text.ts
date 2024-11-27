const formatSlugToText = (slug: string) => slug.replace(/-/g, " ");

const formatTextToSlug = (text: string) => text.replace(/ /g, "-");

export const textUtils = { formatSlugToText, formatTextToSlug };
