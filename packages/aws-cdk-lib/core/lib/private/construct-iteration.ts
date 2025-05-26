import { IConstruct } from 'constructs';

/**
 * Depth-first iterator over the construct tree
 *
 * Replaces `node.findAll()` which both uses recursive function
 * calls and accumulates into an array, both of which are much slower
 * than this solution.
 */
export function* iterateDfsPreorder(root: IConstruct) {
  // Use a specialized queue data structure. Using `Array.shift()`
  // has a huge performance penalty (difference on the order of
  // ~50ms vs ~1s to iterate a large construct tree)
  const stack: IConstruct[] = [root];

  let next = stack.pop();
  while (next) {
    // Get at the construct internals to get at the children faster
    // const children: Record<string, IConstruct> = (next.construct.node as any)._children;
    for (const child of next.node.children) {
      stack.push(child);
    }
    yield next;

    next = stack.pop();
  }
}

