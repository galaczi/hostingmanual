/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Pages collection - for static pages and articles
  const pagesCollection = new Collection({
    name: 'pages',
    type: 'base',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        min: 1,
        max: 255
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        min: 1,
        max: 255,
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
      },
      {
        name: 'content',
        type: 'json',
        required: true
      },
      {
        name: 'excerpt',
        type: 'text',
        required: false,
        max: 500
      },
      {
        name: 'featured_image',
        type: 'file',
        required: false,
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
      },
      {
        name: 'meta_title',
        type: 'text',
        required: false,
        max: 60
      },
      {
        name: 'meta_description',
        type: 'text',
        required: false,
        max: 160
      },
      {
        name: 'published',
        type: 'bool',
        required: true
      },
      {
        name: 'published_at',
        type: 'date',
        required: false
      },
      {
        name: 'author',
        type: 'relation',
        required: true,
        collectionId: '_pb_users_auth_',
        cascadeDelete: false,
        minSelect: null,
        maxSelect: 1,
        displayFields: ['email', 'name']
      }
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_pages_slug ON pages (slug)',
      'CREATE INDEX idx_pages_published ON pages (published)',
      'CREATE INDEX idx_pages_published_at ON pages (published_at)'
    ],
    listRule: '@request.auth.id != "" || published = true',
    viewRule: '@request.auth.id != "" || published = true',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  });

  app.save(pagesCollection);

  // Hosting providers collection
  const providersCollection = new Collection({
    name: 'hosting_providers',
    type: 'base',
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        min: 1,
        max: 255
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        min: 1,
        max: 255,
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
      },
      {
        name: 'logo',
        type: 'file',
        required: false,
        maxSelect: 1,
        maxSize: 2097152,
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
      },
      {
        name: 'website',
        type: 'url',
        required: false
      },
      {
        name: 'affiliate_link',
        type: 'url',
        required: false
      },
      {
        name: 'description',
        type: 'text',
        required: false,
        max: 1000
      },
      {
        name: 'overall_rating',
        type: 'number',
        required: false,
        min: 0,
        max: 5
      },
      {
        name: 'pricing_start',
        type: 'number',
        required: false,
        min: 0
      },
      {
        name: 'pricing_currency',
        type: 'text',
        required: false,
        max: 3
      },
      {
        name: 'features',
        type: 'json',
        required: false
      },
      {
        name: 'pros',
        type: 'json',
        required: false
      },
      {
        name: 'cons',
        type: 'json',
        required: false
      },
      {
        name: 'active',
        type: 'bool',
        required: true
      }
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_providers_slug ON hosting_providers (slug)',
      'CREATE INDEX idx_providers_active ON hosting_providers (active)',
      'CREATE INDEX idx_providers_rating ON hosting_providers (overall_rating)'
    ],
    listRule: 'active = true || @request.auth.id != ""',
    viewRule: 'active = true || @request.auth.id != ""',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  });

  app.save(providersCollection);

  // Posts/Reviews collection
  const postsCollection = new Collection({
    name: 'posts',
    type: 'base',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        min: 1,
        max: 255
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        min: 1,
        max: 255,
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
      },
      {
        name: 'content',
        type: 'json',
        required: true
      },
      {
        name: 'excerpt',
        type: 'text',
        required: false,
        max: 500
      },
      {
        name: 'featured_image',
        type: 'file',
        required: false,
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
      },
      {
        name: 'category',
        type: 'select',
        required: true,
        maxSelect: 1,
        values: ['review', 'comparison', 'guide', 'news', 'tutorial']
      },
      {
        name: 'tags',
        type: 'json',
        required: false
      },
      {
        name: 'hosting_provider',
        type: 'relation',
        required: false,
        collectionId: providersCollection.id,
        cascadeDelete: false,
        minSelect: null,
        maxSelect: 1,
        displayFields: ['name']
      },
      {
        name: 'rating',
        type: 'number',
        required: false,
        min: 0,
        max: 5
      },
      {
        name: 'meta_title',
        type: 'text',
        required: false,
        max: 60
      },
      {
        name: 'meta_description',
        type: 'text',
        required: false,
        max: 160
      },
      {
        name: 'published',
        type: 'bool',
        required: true
      },
      {
        name: 'published_at',
        type: 'date',
        required: false
      },
      {
        name: 'author',
        type: 'relation',
        required: true,
        collectionId: '_pb_users_auth_',
        cascadeDelete: false,
        minSelect: null,
        maxSelect: 1,
        displayFields: ['email', 'name']
      }
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_posts_slug ON posts (slug)',
      'CREATE INDEX idx_posts_published ON posts (published)',
      'CREATE INDEX idx_posts_published_at ON posts (published_at)',
      'CREATE INDEX idx_posts_category ON posts (category)'
    ],
    listRule: '@request.auth.id != "" || published = true',
    viewRule: '@request.auth.id != "" || published = true',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  });

  app.save(postsCollection);

  // Component templates collection - for reusable editor components
  const componentsCollection = new Collection({
    name: 'component_templates',
    type: 'base',
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        min: 1,
        max: 255
      },
      {
        name: 'type',
        type: 'select',
        required: true,
        maxSelect: 1,
        values: [
          'rating_card',
          'comparison_table',
          'pros_cons',
          'feature_list',
          'pricing_table',
          'call_to_action',
          'testimonial',
          'alert',
          'code_block',
          'faq'
        ]
      },
      {
        name: 'description',
        type: 'text',
        required: false,
        max: 500
      },
      {
        name: 'default_data',
        type: 'json',
        required: true
      },
      {
        name: 'schema',
        type: 'json',
        required: true
      },
      {
        name: 'active',
        type: 'bool',
        required: true
      }
    ],
    indexes: [
      'CREATE INDEX idx_components_type ON component_templates (type)',
      'CREATE INDEX idx_components_active ON component_templates (active)'
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  });

  app.save(componentsCollection);

  // Media library collection
  const mediaCollection = new Collection({
    name: 'media',
    type: 'base',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        min: 1,
        max: 255
      },
      {
        name: 'file',
        type: 'file',
        required: true,
        maxSelect: 1,
        maxSize: 10485760,
        mimeTypes: [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/svg+xml',
          'image/gif'
        ]
      },
      {
        name: 'alt_text',
        type: 'text',
        required: false,
        max: 255
      },
      {
        name: 'caption',
        type: 'text',
        required: false,
        max: 500
      },
      {
        name: 'type',
        type: 'select',
        required: true,
        maxSelect: 1,
        values: ['image', 'icon', 'logo', 'screenshot']
      },
      {
        name: 'uploaded_by',
        type: 'relation',
        required: true,
        collectionId: '_pb_users_auth_',
        cascadeDelete: false,
        minSelect: null,
        maxSelect: 1,
        displayFields: ['email', 'name']
      }
    ],
    indexes: [
      'CREATE INDEX idx_media_type ON media (type)'
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  });

  app.save(mediaCollection);

  // Site settings collection
  const settingsCollection = new Collection({
    name: 'site_settings',
    type: 'base',
    fields: [
      {
        name: 'key',
        type: 'text',
        required: true,
        min: 1,
        max: 255,
        pattern: '^[a-z0-9_]+$'
      },
      {
        name: 'value',
        type: 'json',
        required: true
      },
      {
        name: 'description',
        type: 'text',
        required: false,
        max: 500
      }
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_settings_key ON site_settings (key)'
    ],
    listRule: '@request.auth.id != ""',
    viewRule: null,
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""'
  });

  app.save(settingsCollection);
}, (app) => {
  // Rollback
  const collections = [
    'pages',
    'hosting_providers',
    'posts',
    'component_templates',
    'media',
    'site_settings'
  ];

  collections.forEach(collectionName => {
    try {
      const collection = app.findCollectionByNameOrId(collectionName);
      app.delete(collection);
    } catch (e) {
      // Collection might not exist
    }
  });
});
