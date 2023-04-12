####FE TRAINING UNIT TEST

1. Các bước viết unit test:
- Identify all possible case
- Specify parameters and expected results for each case
- Write test
- Execute test
- Evaluation and assessment of results
2. Các thành phần cơ bản có trong 1 unit test:
- Test suit
- Block test
- Test case
- Action
- Assert
3. Liệt kê tất cả các test cases mà bạn có thể nghĩ ra để kiểm tra 1 mảng có phải là mảng số tăng dần hay không?
- Nhập mảng rỗng, kết quả mong muốn true Ex: []
- Nhập mảng chỉ có 1 phần tử, kết quả mong muốn true Ex: [1]
- Nhập mảng giảm dần, kết quả mong muốn false Ex: [5, 4, 3, 2, 1]
- Nhập mảng mà các phần tử có giá trị giống nhau, kết quả mong muốn true Ex: [2, 2, 2, 2]
- Nhập mảng số có các phần tử lớn nhỏ lộn xộn, kết quả mong muốn false Ex [2, 3, 6, 5]
- Nhập mảng tăng dần trong đó có 2 giá trị trở lên giống nhau, kết quả mong muốn true Ex: [1, 2, 2, 3, 4, 4, 5]
- Nhập mảng tăng dần, kết quả mong muốn true Ex: [1, 2, 3, 4, 5]