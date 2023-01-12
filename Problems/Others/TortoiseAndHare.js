
class Node {
  value;
  next = null;

  constructor(value) {
    this.value = value;
  }
}

class LinkedList {
  head = null;

  constructor(...values) {
    for (let value of values) {
      this.add(new Node(value));
    }
  }

  add(node) {
    if (!this.head) {
      this.head = node;
      return;
    }

    let current = this.head;
    while (current.next)
      current = current.next;

    current.next = node;
  }

  print() { 
    let node = this.head;
    while (node) {
      console.log(node.value);
      node = node.next;
    }
  }
}

function TortoiseAndHareCycleDetection(linkedList) {
  tortoise = linkedList.head;
  hare = linkedList.head;

  while (hare && hare.next) {
    tortoise = tortoise.next;
    hare = hare.next.next;

    if (hare && tortoise.value === hare.value) break;
  }

  if (hare && hare.next) {
    tortoise = linkedList.head;
    while (tortoise.value !== hare.value) {
      tortoise = tortoise.next;
      hare = hare.next;
    }
    return tortoise.value;
  }

  return null;
}

const linkedList = new LinkedList(8, 3, 4, 7, 1, 0, 19, 22, 44, 10);

console.log(TortoiseAndHareCycleDetection(linkedList));

const someMidleNode = linkedList.head.next.next.next;
linkedList.add(someMidleNode);

console.log(TortoiseAndHareCycleDetection(linkedList));


