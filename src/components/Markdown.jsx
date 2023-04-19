// Markdown.js : formatage du markdown en html
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import rangeParser from 'parse-numeric-range';
import ReactDOMServer from 'react-dom/server';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import copy from 'clipboard-copy';
import { FiCopy } from 'react-icons/fi';

// Définitions des langages pris en charge par SyntaxHighlighter.
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

// Composant Markdown pour afficher le contenu formaté
const Markdown = ({ markdown, className }) => {
  const syntaxTheme = coldarkDark;

   // Copier le code dans le presse-papiers
   function handleCopyClick(code) {
    const codeString = ReactDOMServer.renderToString(code);
    const trimmedCode = codeString.replace(/[\r\n]+$/, '');
    copy(trimmedCode);
  }

  // Composants personnalisés pour ReactMarkdown
  const MarkdownComponents = {
    code({ node, inline, className, ...props }) {
      // On vérifie si le bloc de code a un langage défini
      const hasLang = /language-(\w+)/.exec(className || '');
      // On vérifie si le bloc de code a des métadonnées (pour les lignes surlignées)
      const hasMeta = node?.data?.meta;

      // Fonction pour appliquer le surlignage du code
      const applyHighlights = (applyHighlights) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, '');
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : '0';
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data = highlight.includes(applyHighlights)
            ? 'highlight'
            : null;
          return { data };
        } else {
          return {};
        }
      };

      // Rendu conditionnel du composant en fonction de la présence d'un langage défini
      return hasLang ? (
        <div style={{ position: 'relative' }}>
          <SyntaxHighlighter
            style={syntaxTheme}
            customStyle={{ margin: 0, padding: '1.2rem' }}
            language={hasLang[1]}
            PreTag="div"
            className="codeStyle "
            showLineNumbers={false}
            wrapLines={hasMeta}
            useInlineStyles={true}
            lineProps={applyHighlights}
          >
            {props.children}
          </SyntaxHighlighter>
          {/* Bouton pour copier le code */}
          <button
            className="hidden lg:block text-[0.7rem] bg-[#111B27] hover:text-slate-300 text-white px-2 py-[0.1rem] rounded lg:absolute top-1 right-0"
            onClick={() => handleCopyClick(props.children)}
            title="Copier le code"
          >
            <FiCopy />
          </button>
        </div>
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  // Rendu du composant Markdown avec les composants personnalisés
  return (
    <div className={className}>
      <ReactMarkdown components={MarkdownComponents}>
        {markdown.content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
