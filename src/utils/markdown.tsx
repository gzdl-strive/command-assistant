/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactMarkdown from "react-markdown";
import { OrderedListProps } from "react-markdown/lib/ast-to-react";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // 划线、表、任务列表和直接url等的语法扩展
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // 代码高亮
import module from "./markdown.module.css";

const componentList = ["h2", "h3", "blockquote", "code", "ol", "ul", "pre", "table"];

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
    const { children, className } = nodeProps;
    const { tagName } = node;

    const extraOpt: Record<string, string> = {};
  
    if (tagName === "h2") {
      children.length && (extraOpt["id"] = children[0] as string);
    } else if (tagName === "pre") {
      const match = /language-(\w+)/.exec(className || '');
      className && (extraOpt["code-type"] = (match && match.length > 2 ? match[1] : className.split('-')[1]));
      !extraOpt["code-type"] && (extraOpt["code-type"] = "bash");
    }
    return React.createElement(tagName, Object.assign({
      className: module[tagName]
    }, extraOpt), children);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  codeMD: any = ({ node, className, children, ...props }: OrderedListProps) => {
    const match = /language-(\w+)/.exec(className || '');
    return !(props as any)?.inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus as any}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '') || ''}
      </SyntaxHighlighter>
    ) : this.commonMD({ node, className, children, ...props });
  };

  initReactMarkdownComponent() {
    componentList.forEach(item => {
      (this.componentMap[item]) = item === "code" ? this.codeMD : this.commonMD;
    });
    const resHtml = <ReactMarkdown 
      className={this.type} 
      components={this.componentMap}
      remarkPlugins={[remarkGfm]}
    >
      {this.mdStr}
    </ReactMarkdown>;
    return resHtml;
  }
}

export default MarkDown;