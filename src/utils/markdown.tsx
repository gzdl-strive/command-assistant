/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactMarkdown from "react-markdown";
import { OrderedListProps } from "react-markdown/lib/ast-to-react";
import module from "./markdown.module.css";

const componentList = ["h2", "blockquote", "code", "ol", "ul"];

class MarkDown {
  type: string;
  mdStr: string;
  html: JSX.Element;
  componentMap: Record<string, string>;
  constructor(type: string, mdStr: string) {
    this.type = type;
    this.mdStr = mdStr;
    this.componentMap = {};
    this.html = this.initReactMarkdownComponent();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commonMD: any = ({ node, ...nodeProps }: OrderedListProps) => {
    const { children } = nodeProps;
  
    if (node.tagName === "h2") {
      return React.createElement(node.tagName, {
        id: children[0],
        className: module[node.tagName]
      }, children);
    } else {
      return React.createElement(node.tagName, {
        className: module[node.tagName]
      }, children);
    }    
  };

  initReactMarkdownComponent() {
    componentList.forEach(item => {
      (this.componentMap[item]) = this.commonMD;
    });
    const resHtml =  <ReactMarkdown className={this.type} components={this.componentMap}>{this.mdStr}</ReactMarkdown>;
    return resHtml;
  }
}

export default MarkDown;

