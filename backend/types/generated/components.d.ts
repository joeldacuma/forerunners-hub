import type { Struct, Schema } from '@strapi/strapi';

export interface NavigationSubMenu extends Struct.ComponentSchema {
  collectionName: 'components_navigation_sub_menus';
  info: {
    displayName: 'sub-menu';
    icon: 'apps';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavigationMenu extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menus';
  info: {
    displayName: 'Menu';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    subMenu: Schema.Attribute.Component<'navigation.sub-menu', true>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    uid: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ListsGallery extends Struct.ComponentSchema {
  collectionName: 'components_lists_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.String;
  };
}

export interface ListsCards extends Struct.ComponentSchema {
  collectionName: 'components_lists_cards';
  info: {
    displayName: 'Cards';
    icon: 'server';
    description: '';
  };
  attributes: {
    Title: Schema.Attribute.String;
    Description: Schema.Attribute.Text;
    ActionButtonText: Schema.Attribute.String;
    ActionButtonUrl: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface FooterMainFooter extends Struct.ComponentSchema {
  collectionName: 'components_footer_main_footers';
  info: {
    displayName: 'Main Footer';
    icon: 'server';
    description: '';
  };
  attributes: {
    copyrightText: Schema.Attribute.String;
    Company: Schema.Attribute.Component<'navigation.sub-menu', true>;
    Products: Schema.Attribute.Component<'navigation.sub-menu', true>;
    Support: Schema.Attribute.Component<'navigation.sub-menu', true>;
    subscribeTitle: Schema.Attribute.String;
    subscribeDescription: Schema.Attribute.String;
    subscribeButtonText: Schema.Attribute.String;
    facebookUrl: Schema.Attribute.String;
    twitterUrl: Schema.Attribute.String;
    instagramUrl: Schema.Attribute.String;
    linkedinUrl: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'navigation.sub-menu': NavigationSubMenu;
      'navigation.menu': NavigationMenu;
      'lists.gallery': ListsGallery;
      'lists.cards': ListsCards;
      'footer.main-footer': FooterMainFooter;
    }
  }
}
