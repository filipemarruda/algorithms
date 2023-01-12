class Node:
  def __init__(self, data):
    self.data = data
    self.next = None
    self.prev = None

class DoubleLinkedList:
  def __init__(self):
    self.head = None
    self.tail = None

  def printList(self):
    temp = self.head
    while temp:
      print(temp.data)
      temp = temp.next

  

  def printListReverse(self):
    temp = self.tail
    while temp:
      print(temp.data)
      temp = temp.prev
  
  def append(self, data):
    new_node = Node(data)
    
    if self.head is None:
      self.head = new_node
      self.tail = new_node
      return

    last = self.tail

    last.next = new_node
    new_node.prev = last
    self.tail = new_node

  def prepend(self, data):
    new_node = Node(data)
    
    if self.head is None:
      self.head = new_node
      self.tail = new_node
      return

    self.head.prev = new_node
    new_node.next = self.head
    self.head = new_node

  def insertAfterNode(self, node_data, data):
    temp = self.head
    
    while temp.next and temp.data != node_data:
      temp = temp.next

    if temp == None:
      raise "Valor não existe na lista"

    new_node = Node(data)
    new_node.prev = temp
    new_node.next = temp.next

    new_node.prev.next = new_node

    if new_node.next:
      new_node.next.prev = new_node
    else:
      self.tail = new_node


  def insertBeforeNode(self, node_data, data):
    temp = self.head

    if temp.data == node_data:
      self.prepend(data)
      return

    while temp.next and temp.next.data != node_data:
      temp = temp.next
    
    if temp == None:
      raise "Valor não existe na lista"

    new_node = Node(data)
    new_node.prev = temp
    new_node.next = temp.next
    
    new_node.prev.next = new_node
    new_node.next.prev = new_node

def main():
  d_list = DoubleLinkedList()
  d_list.append("A")
  d_list.append("B")
  d_list.append("C")
  d_list.prepend("D")
  d_list.insertAfterNode("C", "X")
  d_list.insertBeforeNode("X", "Z")
  # d_list.printList()

  
  d_list.printListReverse()

main()