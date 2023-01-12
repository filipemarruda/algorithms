class Solution:

    def __init__(self, array) -> None:
        self.array = array

        
    def mergesort(self):
        self.__mergesort(self.array, [None] * len(self.array), 0, len(self.array) - 1)

    def __mergesort(self, array, temp, leftStart, rightEnd):
        if leftStart >= rightEnd:
            return

        middle = int((leftStart + rightEnd) / 2)
        self.__mergesort(array, temp, leftStart, middle)
        self.__mergesort(array, temp, middle + 1, rightEnd)
        self.mergeHalves(array, temp, leftStart, rightEnd)

    def mergeHalves(self, array, temp, leftStart, rightEnd):
        leftEnd = int((leftStart + rightEnd) / 2)
        rightStart = leftEnd + 1
        size = rightEnd - leftStart + 1

        left = leftStart
        right = rightStart
        index = leftStart

        while left <= leftEnd and right <= rightEnd:
            if array[left] <= array[right]:
                temp[index] = array[left]
                left += 1
            else:
                temp[index] = array[right]
                right += 1
            index += 1

        array[leftStart:rightEnd + 1] = temp[leftStart:rightEnd + 1]

def main():
    array = [5, 4, 3, 2, 1]
    Solution(array).mergesort()
    print(array)

main()