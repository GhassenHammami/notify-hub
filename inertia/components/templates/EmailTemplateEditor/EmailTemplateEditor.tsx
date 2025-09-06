import 'grapesjs/dist/css/grapes.min.css'
import './index.css'

import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import prettier from 'prettier/standalone'
import * as parserHtml from 'prettier/parser-html'
import * as parserCss from 'prettier/parser-postcss'

import GrapesJS, { Editor } from 'grapesjs'
import gjspresetwebpage from 'grapesjs-preset-webpage'
import gjsblockbasic from 'grapesjs-blocks-basic'
import forms from 'grapesjs-plugin-forms'
import exporter from 'grapesjs-plugin-export'
import customCode from 'grapesjs-custom-code'
import styleBg from 'grapesjs-style-bg'

import { Loader2 } from 'lucide-react'
import { defaultEmailTemplate } from '~/utils/defaultEmailTemplate'
import juice from 'juice'

interface EmailTemplateEditorProps {
  content?: string
  onContentChange?: (content: string) => void
}

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({
  content = defaultEmailTemplate,
  onContentChange,
}) => {
  const [editor, setEditor] = useState<Editor | null>(null)
  const editorContainerRef = useRef<HTMLDivElement>(null)

  const handleContentChange = (grapesjsEditor: Editor) => {
    if (!onContentChange) return
    onContentChange(grapesjsEditor.runCommand('gjs-get-inlined-html'))
  }

  const handleEditorInit = (grapesjsEditor: Editor) => {
    const pfx = grapesjsEditor.getConfig('stylePrefix')
    const cmdNameCombined = 'gjs-copy-combined-code'
    const cmdNameInlineHtml = 'gjs-get-inlined-html'
    const classNameCombined = `${pfx}btn-prim`
    grapesjsEditor.Commands.add(cmdNameInlineHtml, {
      run(editor, _, opts: any = {}) {
        const htmlWithCss = editor.getHtml() + `<style>${editor.getCss()}</style>`
        return juice(htmlWithCss, opts.juiceOpts ?? {})
      },
    })

    grapesjsEditor.Commands.add(cmdNameCombined, {
      run(grapesjsEditor) {
        const html = grapesjsEditor.getHtml()
        const css = grapesjsEditor.getCss()

        Promise.all([
          prettier.format(html, { parser: 'html', plugins: [parserHtml] }),
          prettier.format(`<head>\n<style>\n${css ?? ''}\n</style>\n</head>`, {
            parser: 'html',
            plugins: [parserCss, parserHtml],
          }),
        ])
          .then(([formattedHtml, formattedCss]) => {
            const combined = formattedCss ? `${formattedCss}\n${formattedHtml}\n` : formattedHtml
            toast.dismiss()
            navigator.clipboard
              .writeText(combined)
              .then(() => {
                toast.success('Code copied to clipboard!')
              })
              .catch((err) => {
                console.error('Failed to copy: ', err)
                toast.error('Failed to copy code to clipboard')
              })
          })
          .catch((err) => console.error('Formatting error:', err))
      },
    })

    grapesjsEditor.onReady(() => {
      const btnCombined = document.createElement('button')
      btnCombined.innerHTML = 'Copy Combined Code'
      btnCombined.className = `${classNameCombined} ${cmdNameCombined}`
      btnCombined.type = 'button'

      grapesjsEditor.on('run:export-template', () => {
        const modalEl = grapesjsEditor.Modal.getContentEl()
        if (!modalEl) return

        if (!modalEl.querySelector(`.${cmdNameCombined}`)) {
          modalEl.appendChild(btnCombined)
        }

        btnCombined.onclick = () => grapesjsEditor.runCommand(cmdNameCombined)
      })

      grapesjsEditor.on('update', () => handleContentChange(grapesjsEditor))

      grapesjsEditor.setComponents(content)
    })
  }

  useEffect(() => {
    if (editorContainerRef.current && !editor) {
      const grapesjsEditor = GrapesJS.init({
        height: '750px',
        container: editorContainerRef.current,
        plugins: [gjspresetwebpage, gjsblockbasic, forms, exporter, customCode, styleBg],
        pluginsOpts: {
          [gjsblockbasic as any]: {
            blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image'],
          },
        },
      })
      setEditor(grapesjsEditor)
      handleEditorInit(grapesjsEditor)
    }

    return () => {
      if (editor) {
        editor.destroy()
        setEditor(null)
      }
    }
  }, [])

  return (
    <>
      <Toaster />
      <div ref={editorContainerRef} id="email-template-grapesjsEditor" className="h-full w-full" />
      {!editor && (
        <div className="flex h-full min-h-96 w-full items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
      )}
    </>
  )
}

export default EmailTemplateEditor
