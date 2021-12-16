import React, { Component } from 'react'
import Markdown from '../tool/ReactMarkdown.jsx'
import Cbtn from '../tool/Closebtn.jsx'

export default class Notehelpwrapper extends Component {
    render() {
        const { Clickbtn } = this.props //開關的 function
        return (
            <div className="help-map dis-center">
                <div className="help-content">
                    <div className="help-header">
                        <Cbtn Clickbtn={Clickbtn}></Cbtn>
                        <h4 className="help-title" id="mySmallModalLabel">
                            <i className="fa fa-question-circle"></i>
                            &ensp;Help
                        </h4>
                    </div>
                    <div className="help-body">
                        <div className="help-block">
                            <div className="helpcontent-header">
                                Markdown 基本公式
                            </div>
                            <table className="help-table">
                                <thead>
                                    <tr>
                                        <th>Example</th>
                                        <th>Syntax</th>
                                    </tr>
                                </thead>
                                <tbody className="markdown-body help-tbody">
                                    <tr>
                                        <td style={{ "width": "400px" }}>標題</td>
                                        <td>#&ensp;標題</td>
                                    </tr>
                                    <tr>
                                        <td><ul><li>無編號清單</li></ul></td>
                                        <td>-&ensp;無編號清單</td>
                                    </tr>
                                    <tr>
                                        <td><ol><li>編號清單</li></ol></td>
                                        <td>1.&ensp;編號清單</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <ul>
                                                <li className="task-list-item">
                                                    <input type="checkbox" className="task-list-item-checkbox" disabled />&ensp;選項
                                                </li>
                                            </ul>
                                        </td>
                                        <td>-&ensp;[ ] 選項</td>
                                    </tr>
                                    <tr>
                                        <td><blockquote> 引用</blockquote></td>
                                        <td>&gt; 引用</td>
                                    </tr>
                                    <tr>
                                        <td><strong>粗體</strong></td>
                                        <td>**粗體**</td>
                                    </tr>
                                    <tr>
                                        <td><i>斜體</i></td>
                                        <td>*斜體*</td>
                                    </tr>
                                    <tr>
                                        <td><s>刪除線</s></td>
                                        <td>~~刪除線~~</td>
                                    </tr>
                                    <tr>
                                        <td><a title="title" href="#">link text</a></td>
                                        <td>[link text](https:// "title")</td>
                                    </tr>
                                    <tr>
                                        <td><div>Image</div></td>
                                        <td>![Image text](https:// "Image ip")</td>
                                    </tr>
                                    <tr>
                                        <td><code>Code</code></td>
                                        <td>`Code`</td>
                                    </tr>
                                    <tr>
                                        <td><Markdown content={"```javascript\nvar i = 0;\n```"} /></td>
                                        <td>```javascript<br />var i = 0;<br />```</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="help-block">
                            <div className="helpcontent-header">
                                Katex 基本公式
                            </div>
                            <div style={{ "padding": "8px" }}>常用 Formula Syntax</div>
                            <table className="latex-table">
                                <tbody className="markdown-body help-tbody">
                                    <tr>
                                        <td>
                                            <Markdown content="$\cancel{=}$ `\cancel{=}` 或 `\mathrlap{\,/}{=}`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\overbrace{a+b+c}^{\text{note}}$ `\overbrace{a+b+c}^{\text{note}}`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\sum x_{i}$ `\sum x_{i}`"></Markdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Markdown content="$\xcancel{ABC}$ `\xcancel{ABC}`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\underbrace{a+b+c}_{\text{note}}$ `\underbrace{a+b+c}_{\text{note}}`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\sqrt[3]{x}$ `\sqrt[3]{x}`"></Markdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Markdown content="$78^\circ$ `78^\circ`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$x+y^{2x}$ `x+y^{2x}`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\sqrt{x + y}$ `\sqrt{x + y}`"></Markdown>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{ "padding": "8px" }}>常用 Math Operators</div>
                            <table className="latex-table">
                                <tbody className="markdown-body help-tbody">
                                    <tr>
                                        <td style={{ "width": " 120px" }}>
                                            <Markdown content="$\sin$ `\sin`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\cos$ `\cos`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\tan$ `\tan`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\cot$ `\cot`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\sec$ `\sec`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\csc$ `\csc`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\log$ `\log`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\ln$ `\ln`"></Markdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Markdown content="$\max$ `\max`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\min$ `\min`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\le$ `\le`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\leq$ `\leq`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\ge$ `\ge`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\geq$ `\geq`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\subset$ `\subset`"></Markdown>
                                        </td>
                                        <td>
                                            <Markdown content="$\supset$ `\supset`"></Markdown>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <a className="lookmore" href="https://katex.org/docs/supported.html" target="__blank">點我看更多...</a>
                        </div>
                    </div>

                </div>
                <div className="help-map mouse dis-center" onClick={Clickbtn}></div>
            </div>
        )
    }
}
