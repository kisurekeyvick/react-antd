class EditService {
    public isMac: boolean = false;
    public transformAPI: any = {};
    public utilsAPI: any = {};
    public bubbleAPI: any = {};
    public actionsAPI: any = {};
    public rawEventsAPI: any = {};
    public eventsAPI: any = {};
    public mouseX: number = 0;
    public mouseY: number = 0;
    public cache: any = {};
    public modifiers: any = {};
    public options: any = {};

    constructor(
        public domRef: HTMLElement
    ) {
        this.isMac = window.navigator.platform === 'MacIntel';
        this.transformAPI = this.transform();
        this.utilsAPI = this.utils();
        this.bubbleAPI = this.bubble();
        this.actionsAPI = this.actions();
        this.rawEventsAPI = this.rawEvents();
        this.eventsAPI = this.events();

        this.cache = {
            command: false,
            shift: false,
            isSelecting: false
        };
    }

    public transform() {
        return {
            matrixToArray(str: any) {
                if (!str || str === 'none') {
                    return [1, 0, 0, 1, 0, 0];
                }
                return str.match(/(-?[0-9\.]+)/g);
            },
            getPreviousTransforms(elem: HTMLElement) {
                return elem.style['-webkit-transform'] || elem.style['transform'] || elem.style['-moz-transform'] || elem.style['-o-transform'] || elem.style['-ms-transform'];
            },
            getMatrix(elem: HTMLElement) {
                const previousTransform = this.getPreviousTransforms(elem);
                return this.matrixToArray(previousTransform);
            },
            applyTransform(elem: HTMLElement, transform: any) {
                elem.style['-webkit-transform'] = transform;
                elem.style['transform'] = transform;
                elem.style['-moz-transform'] = transform;
                elem.style['-o-transform'] = transform;
                elem.style['-ms-transform'] = transform;
            },
            buildTransformString(matrix: any) {
                return 'matrix(' + matrix[0] +
                ', ' + matrix[1] +
                ', ' + matrix[2] +
                ', ' + matrix[3] +
                ', ' + matrix[4] +
                ', ' + matrix[5] + ')';
            },
            getTranslate(elem: HTMLElement) {
                const matrix = this.getMatrix(elem);
                return {
                    x: parseInt(matrix[4], 10),
                    y: parseInt(matrix[5], 10)
                };
            },
            scale(elem: HTMLElement, _scale: any) {
                const matrix = this.getMatrix(elem);
                matrix[0] = matrix[3] = _scale;
                const transform = this.buildTransformString(matrix);
                this.applyTransform(elem, transform);
            },
            translate(elem: HTMLElement, x: any, y: any) {
                const matrix = this.getMatrix(elem);
                matrix[4] = x;
                matrix[5] = y;
                const transform = this.buildTransformString(matrix);
                this.applyTransform(elem, transform);
            },
            rotate(elem: HTMLElement, deg: any) {
                const matrix = this.getMatrix(elem);
                const rad1 = deg * (Math.PI / 180);
                const rad2 = rad1 * -1;
                matrix[1] = rad1;
                matrix[2] = rad2;
                const transform = this.buildTransformString(matrix);
                this.applyTransform(elem, transform);
            }
        };
    }

    public utils() {
        const self = this;
        return {
            keyboard: {
                isCommand(e: any, callbackTrue: any, callbackFalse: any) {
                    if (self.isMac && e.metaKey || !self.isMac && e.ctrlKey) {
                        callbackTrue();
                    } else {
                        callbackFalse();
                    }
                },
                isShift(e: any, callbackTrue: any, callbackFalse: any) {
                    if (e.shiftKey) {
                        callbackTrue();
                    } else {
                        callbackFalse();
                    }
                },
                isModifier(e: any, callback: any) {
                    const key = e.which;
                    const cmd = self.modifiers[key];
                    if (cmd) {
                        callback.call(this, cmd);
                    }
                },
                isEnter(e: any, callback: any) {
                    if (e.which === 13) {
                        callback();
                    }
                },
                isArrow(e: any, callback: any) {
                    if (e.which >= 37 || e.which <= 40) {
                        callback();
                    }
                }
            },
            html: {
                addTag(elem: any, tag: any, focus: any, editable: any) {
                    const newElement =  document.createElement(tag);
                    newElement.sett('contenteditable', String(Boolean(editable)));
                    newElement.append(' ');
                    elem.append(newElement);
                    if (focus) {
                        self.cache.focusedElement = elem.children().last();
                        self.utilsAPI.cursor.set(elem, 0, self.cache.focusedElement);
                    }
                    return newElement;
                }
            },
            cursor: {
                set(editor: any, pos: any, elem: any) {
                    let range: any;
                    if (document.createRange) {
                        range = document.createRange();
                        const selection = window.getSelection();
                        const lastChild = editor.children().last();
                        const length = lastChild.html().length - 1;
                        const toModify = elem ? elem[0] : lastChild[0];
                        const theLength = typeof pos !== 'undefined' ? pos : length;
                        range.setStart(toModify, theLength);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    } else {
                        // range = document.body.createTextRange();
                        // range.moveToElementText(elem);
                        // range.collapse(false);
                        // range.select();
                    }
                }
            },
            selection: {
                save() {
                    if (window.getSelection) {
                        const sel = window.getSelection();
                        if (sel.rangeCount > 0) {
                            return sel.getRangeAt(0);
                        }
                    }
                    // else if (document.selection && document.selection.createRange) { // IE
                    //     return document.selection.createRange();
                    // }
                    return null;
                },
                restore(range: any) {
                    if (range) {
                        if (window.getSelection) {
                            const sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                        // else if (d.selection && range.select) { // IE
                        //     range.select();
                        // }
                    }
                },
                getText() {
                    let txt: string = '';
                    if (window.getSelection) {
                        txt = window.getSelection().toString();
                    } else if (document.getSelection) {
                        txt = (document.getSelection() || '').toString();
                    }
                    // else if (document.selection) {   // IE
                    //     txt = document.selection.createRange().text;
                    // }
                    return txt;
                },
                clear() {
                    if (window.getSelection) {
                        if (window.getSelection().empty) { // Chrome
                            window.getSelection().empty();
                        } else if (window.getSelection().removeAllRanges) { // Firefox
                            window.getSelection().removeAllRanges();
                        }
                    }
                    // else if (document.selection) { // IE?
                    //     document.selection.empty();
                    // }
                },
                getContainer(sel: any) {
                    if (window.getSelection && sel && sel.commonAncestorContainer) {
                        return sel.commonAncestorContainer;
                    }
                    // else if (document.selection && sel && sel.parentElement) {
                    //     return sel.parentElement();
                    // }
                    return null;
                },
                getSelection() {
                    if (window.getSelection) {
                        return window.getSelection();
                    }
                    // else if (d.selection && d.selection.createRange) { // IE
                    //     return d.selection;
                    // }
                    return null;
                }
            },
            validation: {
                isUrl(url: string) {
                    return (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).test(url);
                }
            }
        };
    }

    public bubble() {
        return {

        };
    }

    public actions() {
        const self = this;

        return {
            bindEvents(elem: HTMLElement) {
                elem.onkeydown = self.rawEventsAPI.keydown;
                elem.onkeyup = self.rawEventsAPI.keyup;
                elem.onfocus = self.rawEventsAPI.focus;
                elem.addEventListener('paste', self.eventsAPI.paste);
                elem.onmousedown = self.rawEventsAPI.mouseClick;
                elem.onmouseup = self.rawEventsAPI.mouseUp;
                elem.onmousemove = self.rawEventsAPI.mouseMove;
                elem.onblur = self.rawEventsAPI.blur;

                const body: any = document.querySelector('body');
                body.onmouseup = function(e: any) {
                    if (e.target === e.currentTarget && self.cache.isSelecting) {
                        self.rawEventsAPI.mouseUp.call(elem, e);
                    }
                };
            },
            setPlaceholder(e: any) {
                // if (/^\s*$/.test(self.domTarget.textContent)) {
                //     // $(this).empty();
                //     self.domTarget.innerHTML = '';
                //     var placeholder = utils.html.addTag($(this), 'p').addClass('placeholder');
                //     placeholder.append($(this).attr('editor-placeholder'));
                //     utils.html.addTag($(this), 'p', typeof e.focus != 'undefined' ? e.focus : false, true);
                // } else {
                //     $(this).find('.placeholder').remove();
                // }
            },
            removePlaceholder(e: any) {
                // $(this).find('.placeholder').remove();
            },
            preserveElementFocus() { 
                const anchorNode = window.getSelection() ? window.getSelection().anchorNode : document.activeElement;
                if (anchorNode) {
                    let current: any = anchorNode.parentNode;
                    const diff: boolean = current !== self.cache.focusedElement;
                    const children = self.domRef.children;
                    
                    let elementIndex: number = 0;

                    if (current === this) {
                        current = anchorNode;
                    }

                    for (let i = 0; i < children.length; i++) {
                        if (current === children[i]) {
                            elementIndex = i;
                            break;
                        }
                    }

                    if (diff) {
                        self.cache.focusedElement = current;
                        self.cache.focusedElementIndex = elementIndex;
                    }
                }
            },
            prepare(elem: HTMLElement, customOptions: any) {
                const options = customOptions;

                elem.setAttribute('editor-mode', options.mode);
                elem.setAttribute('editor-placeholder', options.placeholder);
                elem.setAttribute('contenteditable', 'true');
                elem.setAttribute('position', 'relative');

                // elem.attr('editor-mode', options.mode);
                // elem.attr('editor-placeholder', options.placeholder);
                // elem.attr('contenteditable', true);
                // elem.css('position', 'relative');
                // elem.addClass('jquery-notebook editor');
                // self.actionsAPI.setPlaceholder.call(elem, {});
                self.actionsAPI.preserveElementFocus.call(elem);
                if (options.autoFocus === true) {
                    const firstP = elem.querySelectorAll('p:not(.placeholder)');
                    self.utilsAPI.cursor.set(elem, 0, firstP);
                }
            },
        };
    }

    public rawEvents() {
        const self = this;
        return {
            keydown(e: any) {
                // const elem = this;
                if (self.cache.command && e.which === 65) {
                    // setTimeout(function() {
                    //     self.bubbleAPI.show.call(elem);
                    // }, 50);
                }

                self.utilsAPI.keyboard.isCommand(e, function() {
                    self.cache.command = true;
                }, function() {
                    self.cache.command = false;
                });

                self.utilsAPI.keyboard.isShift(e, function() {
                    self.cache.shift = true;
                }, function() {
                    self.cache.shift = false;
                });

                self.utilsAPI.keyboard.isModifier.call(self.domRef, e, function(modifier: any) {
                    if (self.cache.command) {
                        self.eventsAPI.commands[modifier].call(self.domRef, e);
                    }
                });

                if (self.cache.shift) {
                    self.utilsAPI.keyboard.isArrow.call(this, e, function() {
                        // setTimeout(function() {
                        //     const txt: string = self.utilsAPI.selection.getText();
                        //     if (txt !== '') {
                        //         self.bubbleAPI.show.call(elem);
                        //     } else {
                        //         self.bubbleAPI.clear.call(elem);
                        //     }
                        // }, 100);
                    });
                } else {
                    self.utilsAPI.keyboard.isArrow.call(this, e, function() {
                        // self.bubbleAPI.clear.call(elem);
                    });
                }

                if (e.which === 13) {
                    // self.bubbleAPI.enterKey.call(this, e);
                }

                if (e.which === 27) {
                    // self.bubbleAPI.clear.call(this);
                }

                if (e.which === 86 && self.cache.command) {
                    self.eventsAPI.paste.call(this, e);
                }

                if (e.which === 90 && self.cache.command) {
                    self.eventsAPI.commands.undo.call(this, e);
                }
            },
            keyup(e: any) {
                self.utilsAPI.keyboard.isCommand(e, function() {
                    self.cache.command = false;
                }, function() {
                    self.cache.command = true;
                });

                self.actionsAPI.preserveElementFocus.call(this);
                self.actionsAPI.removePlaceholder.call(this);
                const dom: any = self.domRef;
                if (/^\s*$/.test(dom.textContent)) {
                    self.domRef.innerHTML = '';
                    self.utilsAPI.html.addTag(self.domRef, 'p', true, true);
                }
            },
            focus(e: any) {
                self.cache.command = false;
                self.cache.shift = false;
            },
            mouseClick(e: any) {
                self.cache.isSelecting = true;
                const dom: any = self.domRef;
                const parentDom: any = dom.parentElement;
                if (dom.parentElement.classList.contains('.bubble:visible')) {
                    const bubbleTag: HTMLElement = parentDom.querySelector('.bubble:visible');
                    const bubbleX = bubbleTag.offsetLeft;
                    const bubbleY = bubbleTag.offsetTop;
                    const bubbleWidth = bubbleTag.clientWidth;
                    const bubbleHeight = bubbleTag.clientHeight;

                    if (self.mouseX > bubbleX && self.mouseX < bubbleX + bubbleWidth &&
                        self.mouseY > bubbleY && self.mouseY < bubbleY + bubbleHeight) {
                        return;
                    }
                }
            },
            mouseUp(e: any) {
                // const elem = this;
                self.cache.isSelecting = false;
                setTimeout(function() {
                    const s = self.utilsAPI.selection.save();
                    if (s) {
                        if (s.collapsed) {
                            // self.bubbleAPI.clear.call(elem);
                        } else {
                            // self.bubbleAPI.show.call(elem);
                            e.preventDefault();
                        }
                    }
                }, 50);


            },
            mouseMove(e: any) {
                self.mouseX = e.pageX;
                self.mouseY = e.pageY;
            },
            blur(e: any) {
                // self.actionsAPI.setPlaceholder.call(this, {
                //     focus: false
                // });
            }
        };
    }

    public events() {
        const self = this;

        return {
            commands: {
                bold(e: any) {
                    e.preventDefault();
                    document.execCommand('bold', false);
                    // self.bubbleAPI.update.call(this);
                },
                italic(e: any) {
                    e.preventDefault();
                    document.execCommand('italic', false);
                    // self.bubbleAPI.update.call(this);
                },
                underline(e: any) {
                    e.preventDefault();
                    document.execCommand('underline', false);
                    // self.bubbleAPI.update.call(this);
                },
                anchor(e: any) {
                    e.preventDefault();
                    // const s = self.utilsAPI.selection.save();
                    // self.bubbleAPI.showLinkInput.call(this, s);
                },
                createLink(e: any, s: any) {
                    self.utilsAPI.selection.restore(s);
                    document.execCommand('createLink', false, e.url);
                    // self.bubbleAPI.update.call(this);
                },
                removeLink(e: any, s: any) {
                    // var el = $(utils.selection.getContainer(s)).closest('a');
                    // el.contents().first().unwrap();
                },
                h1(e: any) {
                    // e.preventDefault();
                    // if ($(window.getSelection().anchorNode.parentNode).is('h1')) {
                    //     document.execCommand('formatBlock', false, '<p>');
                    // } else {
                    //     document.execCommand('formatBlock', false, '<h1>');
                    // }
                    // self.bubbleAPI.update.call(this);
                },
                h2(e: any) {
                    // e.preventDefault();
                    // if ($(window.getSelection().anchorNode.parentNode).is('h2')) {
                    //     document.execCommand('formatBlock', false, '<p>');
                    // } else {
                    //     document.execCommand('formatBlock', false, '<h2>');
                    // }
                    // self.bubbleAPI.update.call(this);
                },
                ul(e: any) {
                    e.preventDefault();
                    document.execCommand('insertUnorderedList', false);
                    // self.bubbleAPI.update.call(this);
                },
                ol(e: any) {
                    e.preventDefault();
                    document.execCommand('insertOrderedList', false);
                    // self.bubbleAPI.update.call(this);
                },
                undo(e: any) {
                    e.preventDefault();
                    document.execCommand('undo', false);
                    const sel = window.getSelection();
                    const range = sel.getRangeAt(0);
                    const boundary = range.getBoundingClientRect();
                    console.log('boundary', boundary);
                    // $(document).scrollTop($(document).scrollTop() + boundary.top);
                }
            },
        };
    }
}
