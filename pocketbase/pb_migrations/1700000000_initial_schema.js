/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  // Pages collection - for static pages and articles
  const pagesCollection = new Collection({
    id: 'pages_collection_id',
    name: 'pages',
    type: 'base',
    system: false,
    schema: [
      {
        name: 'title',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255
        }
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255,
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        }
      },
      {
        name: 'content',
        type: 'json',
        required: true,
        options: {}
      },
      {
        name: 'excerpt',
        type: 'text',
        required: false,
        options: {
          max: 500
        }
      },
      {
        name: 'featured_image',
        type: 'file',
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
        }
      },
      {
        name: 'meta_title',
        type: 'text',
        required: false,
        options: {
          max: 60
        }
      },
      {
        name: 'meta_description',
        type: 'text',
        required: false,
        options: {
          max: 160
        }
      },
      {
        name: 'published',
        type: 'bool',
        required: true,
        options: {}
      },
      {
        name: 'published_at',
        type: 'date',
        required: false,
        options: {}
      },
      {
        name: 'author',
        type: 'relation',
        required: true,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: ['email', 'name']
        }
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

  db.saveCollection(pagesCollection);

  // Hosting providers collection
  const providersCollection = new Collection({
    id: 'providers_collection_id',
    name: 'hosting_providers',
    type: 'base',
    system: false,
    schema: [
      {
        name: 'name',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255
        }
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255,
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        }
      },
      {
        name: 'logo',
        type: 'file',
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 2097152,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
        }
      },
      {
        name: 'website',
        type: 'url',
        required: false,
        options: {}
      },
      {
        name: 'affiliate_link',
        type: 'url',
        required: false,
        options: {}
      },
      {
        name: 'description',
        type: 'text',
        required: false,
        options: {
          max: 1000
        }
      },
      {
        name: 'overall_rating',
        type: 'number',
        required: false,
        options: {
          min: 0,
          max: 5
        }
      },
      {
        name: 'pricing_start',
        type: 'number',
        required: false,
        options: {
          min: 0
        }
      },
      {
        name: 'pricing_currency',
        type: 'text',
        required: false,
        options: {
          max: 3
        }
      },
      {
        name: 'features',
        type: 'json',
        required: false,
        options: {}
      },
      {
        name: 'pros',
        type: 'json',
        required: false,
        options: {}
      },
      {
        name: 'cons',
        type: 'json',
        required: false,
        options: {}
      },
      {
        name: 'active',
        type: 'bool',
        required: true,
        options: {}
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

  db.saveCollection(providersCollection);

  // Posts/Reviews collection
  const postsCollection = new Collection({
    id: 'posts_collection_id',
    name: 'posts',
    type: 'base',
    system: false,
    schema: [
      {
        name: 'title',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255
        }
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255,
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        }
      },
      {
        name: 'content',
        type: 'json',
        required: true,
        options: {}
      },
      {
        name: 'excerpt',
        type: 'text',
        required: false,
        options: {
          max: 500
        }
      },
      {
        name: 'featured_image',
        type: 'file',
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
        }
      },
      {
        name: 'category',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['review', 'comparison', 'guide', 'news', 'tutorial']
        }
      },
      {
        name: 'tags',
        type: 'json',
        required: false,
        options: {}
      },
      {
        name: 'hosting_provider',
        type: 'relation',
        required: false,
        options: {
          collectionId: 'providers_collection_id',
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: ['name']
        }
      },
      {
        name: 'rating',
        type: 'number',
        required: false,
        options: {
          min: 0,
          max: 5
        }
      },
      {
        name: 'meta_title',
        type: 'text',
        required: false,
        options: {
          max: 60
        }
      },
      {
        name: 'meta_description',
        type: 'text',
        required: false,
        options: {
          max: 160
        }
      },
      {
        name: 'published',
        type: 'bool',
        required: true,
        options: {}
      },
      {
        name: 'published_at',
        type: 'date',
        required: false,
        options: {}
      },
      {
        name: 'author',
        type: 'relation',
        required: true,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: ['email', 'name']
        }
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

  db.saveCollection(postsCollection);

  // Component templates collection - for reusable editor components
  const componentsCollection = new Collection({
    id: 'components_collection_id',
    name: 'component_templates',
    type: 'base',
    system: false,
    schema: [
      {
        name: 'name',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255
        }
      },
      {
        name: 'type',
        type: 'select',
        required: true,
        options: {
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
        }
      },
      {
        name: 'description',
        type: 'text',
        required: false,
        options: {
          max: 500
        }
      },
      {
        name: 'default_data',
        type: 'json',
        required: true,
        options: {}
      },
      {
        name: 'schema',
        type: 'json',
        required: true,
        options: {}
      },
      {
        name: 'active',
        type: 'bool',
        required: true,
        options: {}
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

  db.saveCollection(componentsCollection);

  // Media library collection
  const mediaCollection = new Collection({
    id: 'media_collection_id',
    name: 'media',
    type: 'base',
    system: false,
    schema: [
      {
        name: 'title',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255
        }
      },
      {
        name: 'file',
        type: 'file',
        required: true,
        options: {
          maxSelect: 1,
          maxSize: 10485760,
          mimeTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/svg+xml',
            'image/gif'
          ]
        }
      },
      {
        name: 'alt_text',
        type: 'text',
        required: false,
        options: {
          max: 255
        }
      },
      {
        name: 'caption',
        type: 'text',
        required: false,
        options: {
          max: 500
        }
      },
      {
        name: 'type',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['image', 'icon', 'logo', 'screenshot']
        }
      },
      {
        name: 'uploaded_by',
        type: 'relation',
        required: true,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: ['email', 'name']
        }
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

  db.saveCollection(mediaCollection);

  // Site settings collection
  const settingsCollection = new Collection({
    id: 'settings_collection_id',
    name: 'site_settings',
    type: 'base',
    system: false,
    schema: [
      {
        name: 'key',
        type: 'text',
        required: true,
        options: {
          min: 1,
          max: 255,
          pattern: '^[a-z0-9_]+$'
        }
      },
      {
        name: 'value',
        type: 'json',
        required: true,
        options: {}
      },
      {
        name: 'description',
        type: 'text',
        required: false,
        options: {
          max: 500
        }
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

  db.saveCollection(settingsCollection);

  return true;
}, (db) => {
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
      const collection = db.findCollectionByNameOrId(collectionName);
      db.deleteCollection(collection);
    } catch (e) {
      // Collection might not exist
    }
  });

  return true;
});
