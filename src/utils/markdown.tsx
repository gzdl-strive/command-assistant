/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactMarkdown from "react-markdown";
import { OrderedListProps } from "react-markdown/lib/ast-to-react";
import module from "./markdown.module.css";

const componentList = ["h2", "blockquote", "code", "ol", "ul"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commonMD: any = ({ node, ...nodeProps }: OrderedListProps) => {
  const { children } = nodeProps;
  return React.createElement(node.tagName, node.tagName === "h2" ? {
    id: children[0]
  } : {
    className: module[node.tagName]
  }, children);
};

const componentMap: Record<string, string> = {};
componentList.forEach(item => {
  (componentMap[item]) = commonMD;
});

/**
 * 解析md字符串为HTML结构
 * @param str 
 * @returns 
 */
function getReactMarkdownConponent(str: string) {
  return <ReactMarkdown components={componentMap}>
    {str}
  </ReactMarkdown>;
}

export {
  getReactMarkdownConponent
};

