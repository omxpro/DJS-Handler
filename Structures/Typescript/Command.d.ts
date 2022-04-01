import {
  GuildMember,
  Message,
  PermissionResolvable,
  TextChannel,
} from "discord.js";
import ExtendedClient from "../Client";

interface ExtendedMessage extends Message {
  member: GuildMember;
}

interface RunOptions {
  client: ExtendedClient;
  message: ExtendedMessage;
  args: string[];
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  name: string;
  description: string;
  aliases?: string[];
  category: string;
  usage?: string;
  userPermissions?: PermissionResolvable[];
  botPermissions?: PermissionResolvable[];
  nsfw?: boolean;
  devOnly?: boolean;
  run: RunFunction;
};
