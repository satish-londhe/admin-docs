// Algolia Crawler configuration for CMP Admin Docs
// Used by the Algolia Crawler (https://crawler.algolia.com/admin)
// or submitted with your DocSearch application at https://docsearch.algolia.com/apply/

new Crawler({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_CRAWLER_ADMIN_API_KEY',
  rateLimit: 8,
  maxDepth: 10,
  startUrls: ['https://docs.stackconsole.io/'],
  sitemaps: ['https://docs.stackconsole.io/sitemap.xml'],
  ignoreCanonicalTo: true,
  discoveryPatterns: ['https://docs.stackconsole.io/**'],
  actions: [
    {
      indexName: 'cmp-admin-docs',
      pathsToMatch: ['https://docs.stackconsole.io/**'],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          recordProps: {
            lvl1: ['header h1', 'article h1', 'main h1', 'h1'],
            content: ['article p, article li, article td:last-child'],
            lvl0: {
              selectors: '',
              defaultValue: 'Documentation',
            },
            lvl2: ['article h2'],
            lvl3: ['article h3'],
            lvl4: ['article h4'],
            lvl5: ['article h5'],
            lvl6: ['article h6'],
          },
          indexHeadings: true,
          aggregateContent: true,
          recordVersion: 'v3',
        });
      },
    },
  ],
  initialIndexSettings: {
    'cmp-admin-docs': {
      attributesForFaceting: [
        'type',
        'lang',
        'language',
        'version',
        'docusaurus_tag',
      ],
      attributesToRetrieve: [
        'hierarchy',
        'content',
        'anchor',
        'url',
        'url_without_anchor',
        'type',
      ],
      attributesToHighlight: ['hierarchy', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'content'],
      searchableAttributes: [
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom',
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
      separatorsToIndex: '_',
    },
  },
});
