from email import header


class Node:
  def __init__(self, data):
    self.data = data
    self.next = None

class LinkedList:
  def __init__(self):
    self.head = None

  def printList(self):
    temp = self.head
    while temp:
      print(temp.data)
      temp = temp.next
  
  def append(self, data):
    new_node = Node(data)
    if self.head is None:
      self.head = new_node
      return
    last = self.head
    while last.next:
      last = last.next
    last.next = new_node

  def prepend(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node

  def insertAfterNode(self, node_data, data):
    temp = self.head
    while temp.next and temp.data != node_data:
      temp = temp.next
    
    if temp == None:
      raise "Valor não existe na lista"

    new_node = Node(data)
    new_node.next = temp.next
    temp.next = new_node

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
    new_node.next = temp.next
    temp.next = new_node

def main():
  llist = LinkedList()
  llist.append("A")
  llist.append("B")
  llist.append("C")
  llist.prepend("D")
  llist.insertAfterNode("C", "X")
  llist.insertBeforeNode("X", "Z")
  llist.printList()

main()