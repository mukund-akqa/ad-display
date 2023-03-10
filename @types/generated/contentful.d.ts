// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IArticleFields {
  /** title */
  title: string;

  /** slug */
  slug: string;

  /** Date */
  date: string;

  /** Content */
  content: Document;
}

export interface IArticle extends Entry<IArticleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "article";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IFooterFields {
  /** Title */
  title: string;

  /** Footer-heading-title */
  footerHeadingTitle: string;

  /** Footer-Links */
  footerLinks: string[];
}

/** Footer-content */

export interface IFooter extends Entry<IFooterFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "footer";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IKitchenCarouselFields {
  /** Title */
  title?: string | undefined;

  /** Description */
  description?: string | undefined;

  /** Image */
  image?: Asset | undefined;
}

export interface IKitchenCarousel extends Entry<IKitchenCarouselFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "kitchenCarousel";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE = "article" | "footer" | "kitchenCarousel";

export type IEntry = IArticle | IFooter | IKitchenCarousel;

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
