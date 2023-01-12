class Node:
  def __init__(self, data) -> None:
    self.data = data
    self.next = None

class Heap:
  def __init__(self) -> None:
    self.head = None

  def push(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node

  def pop(self):
    poped = self.head
    self.head = self.head.next
    return poped.data

  def print(self):
    temp = self.head
    while temp:
      print(temp.data)
      temp = temp.next
      

def main():
  heap = Heap()
  heap.print()
  heap.push("A")
  heap.push("B")
  heap.push("C")
  heap.push("D")
  heap.push("E")
  heap.push("F")

  print("poped: ", heap.pop())
  print("poped: ", heap.pop())
  print("poped: ", heap.pop())
  print("poped: ", heap.pop())

  heap.push("F")

  heap.print()

main()