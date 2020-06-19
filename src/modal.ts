/**
 * @file Contains Modal class.
 * @author Elliot Thomas
 */

import { Blueprint } from './blueprint';
import { Component, ComponentArgs } from './component';

export interface ModalArgs extends ComponentArgs {}

/** Modal class. */
export class Modal extends Component {
  /** Construct and then display a Modal. */
  constructor(args: ModalArgs) {
    super(args);

    // modify blueprint to include the modal layers
    const content = args?.content || 'No content';
    const blueprint: Blueprint = {
      meta: args?.blueprint?.meta || {},
      view: {
        class: 'modal-root rzl-hidden',
        id: `modal-${args?.name || ''}-root`,
        children: [
          {
            class: 'modal-box',
            id: `modal-${this.name}-box`,
            children: [
              {
                class: 'modal-header',
                id: `modal-${this.name}-header`,
                children: [
                  {
                    class: 'modal-btn-close',
                    content: '<span class="iconify icon:ion:close"></span>',
                    events: { click: this.destroy.bind(this) },
                  },
                ],
              },
              {
                class: 'modal-body',
                id: `modal-${this.name}-body`,
                children: [args?.blueprint?.view || { content }],
              },
              {
                class: 'modal-footer',
                id: `modal-${this.name}-footer`,
              },
            ],
          },
        ],
      },
    };

    this.blueprint = blueprint;
  }
}
