from visualize import visualize_sorting


def selection_sort(arr):
    for i in range(len(arr)-1):
        min = i

        for j in range(i+1, len(arr)):
            if arr[j] < arr[min]:
                min = j

        temp = arr[i]
        arr[i] = arr[min]
        arr[min] = temp
        visualize_sorting(arr)
    return arr
