import {
  EmbedFieldData,
  EmbedFooterData,
  ColorResolvable,
  EmbedAuthorData,
} from "discord.js";

export type embedOptions = {
  title?: string;
  description?: string;
  color?: ColorResolvable;
  author?: EmbedAuthorData;
  fields?: EmbedFieldData[];
  footer?: EmbedFooterData;
  image?: string;
  thumbnail?: string;
  url?: string;
};
