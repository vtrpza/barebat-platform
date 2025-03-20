export const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';

export async function createBuilderContent(siteData: any, template: string, data: any) {
  const response = await fetch('https://api.builder.io/api/v1/write/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BUILDER_API_KEY}`,
    },
    body: JSON.stringify({
      name: `Site ${siteData.id}`,
      published: 'draft',
      modelId: 'bar-mitzvah-site', // or bat-mitzvah-site based on selection
      data: {
        blocks: data.blocks,
        state: {
          siteId: siteData.id,
          templateId: template,
        },
      },
    }),
  });

  return response.json();
} 