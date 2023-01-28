import React from "react";
import { DecoratorNode } from "lexical";

function PageBreakComponent() {
  return React.createElement('span', null);
}

export class PageBreakNode extends DecoratorNode<any> {
  static getType() {
    return 'pagebreak';
  }

  static clone(node) {
    return new PageBreakNode(node.__key);
  }

  static importJSON(serializedNode) {
    return $createPageBreakNode();
  }

  exportJSON() {
    return {
      type: 'pagebreak',
      version: 1
    };
  }

  createDOM() {
    const div = document.createElement("div");
    div.style.pageBreakAfter = "always";
    div.className = "page-break";
    // div.role = "doc-pagebreak";
    return div;
  }

  getTextContent() {
    return "\n";
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return React.createElement(PageBreakComponent, null);
  }
}

export function $createPageBreakNode() {
  return new PageBreakNode();
}

export function $isPageBreakNode(node) {
  return node instanceof PageBreakNode;
}
