import type { Node } from "unist";
import type { Transformer } from "unified";
import { TwoSlashReturn } from "@typescript/twoslash";
import { parse } from "fenceparser";
import { Lang, Highlighter } from "@olets/shiki";
import { UserConfigSettings } from "@olets/shiki-twoslash";
declare type Fence = {
    lang: string;
    meta: NonNullable<ReturnType<typeof parse>>;
};
/**
 * Runs twoslash across an AST node, switching out the text content, and lang
 * and adding a `twoslash` property to the node.
 */
export declare const runTwoSlashOnNode: (code: string, { lang, meta }: Fence, settings?: UserConfigSettings) => TwoSlashReturn | undefined;
/** Sets up the highlighters, and cache's for recalls */
export declare const highlightersFromSettings: (settings: UserConfigSettings) => Promise<Highlighter[]>;
export declare type RemarkCodeNode = Node & {
    lang?: Lang;
    meta?: string;
    type: string;
    value: string;
    children: Node[];
    twoslash?: TwoSlashReturn;
};
export declare type Options = UserConfigSettings;
/**
 * Synchronous outer function, async inner function, which is how the remark
 * async API works.
 */
declare function remarkTwoslash(settings?: Options): Transformer;
/**
 * The function doing the work of transforming any codeblock samples in a remark AST.
 */
export declare const remarkVisitor: (highlighters: Highlighter[], twoslashSettings?: UserConfigSettings) => (node: RemarkCodeNode) => void;
export default remarkTwoslash;
/** Only the inner function exposed as a synchronous API for markdown-it */
export declare const setupForFile: (settings?: UserConfigSettings) => Promise<{
    settings: UserConfigSettings;
    highlighters: Highlighter[];
}>;
export declare const transformAttributesToHTML: (code: string, fenceString: string, highlighters: Highlighter[], settings: UserConfigSettings) => string;
