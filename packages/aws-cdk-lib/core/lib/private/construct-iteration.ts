import { IConstruct } from 'constructs';

/**
 * Depth-first iterator over the construct tree
 *
 * Replaces `node.findAll()` which both uses recursive function
 * calls and accumulates into an array, both of which are much slower
 * than this solution.
 */
export function* iterateDfsPreorder(root: IConstruct) {
  const stack: IConstruct[] = [root];

  let next = stack.pop();
  while (next) {
    for (const child of next.node.children) {
      stack.push(child);
    }
    yield next;

    next = stack.pop();
  }
}

