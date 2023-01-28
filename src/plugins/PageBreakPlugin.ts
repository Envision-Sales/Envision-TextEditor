import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, createCommand } from "lexical";

import { $createPageBreakNode, PageBreakNode } from "../nodes/PageBreakNode";

export const INSERT_PAGE_BREAK_COMMAND = createCommand();

export default function PageBreakPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([PageBreakNode])) {
      throw new Error("PageBreakPlugin: PageBreakNode not registered on editor");
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      INSERT_PAGE_BREAK_COMMAND,
      type => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return false;
        }

        const focusNode = selection.focus.getNode();

        if (focusNode !== null) {
          const pageBreakNode = $createPageBreakNode();
          selection.focus
            .getNode()
            .getTopLevelElementOrThrow()
            .insertBefore(pageBreakNode);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
