class Node:
  def __init__(self, data) -> None:
    self.data = data
    self.prev = None

class Queue:
  def __init__(self) -> None:
    self.head = None
    self.tail = None

  def add(self, data):
    new_node = Node(data)
    
    if not self.head and not self.tail:
      self.head = self.tail = new_node
      return

    self.head.prev = new_node
    self.head = new_node

  def remove(self):
    removed = self.tail
    self.tail = removed.prev
    return removed.data

  def print(self):
    temp = self.tail
    while temp:
      print(temp.data)
      temp = temp.prev

def main():
  queue = Queue()
  queue.add("A")
  queue.add("B")
  queue.add("C")
  queue.add("D")
  queue.add("E")
  queue.add("F")
  queue.add("G")

  print("removed", queue.remove())
  print("removed", queue.remove())
  print("removed", queue.remove())
  print("removed", queue.remove())

  queue.add("X")
  
  print("removed", queue.remove())

  queue.print()

main()