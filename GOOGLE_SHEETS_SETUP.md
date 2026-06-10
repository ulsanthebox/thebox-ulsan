# 구글 시트 연동 설정 가이드 — THE BOX ULSAN

## 총 소요 시간: 약 5분

---

## 1단계: 구글 시트 만들기

1. [sheets.google.com](https://sheets.google.com) 접속 후 **새 스프레드시트** 생성
2. 시트 이름을 원하는 대로 설정 (예: `더박스 울산 상담지`)

---

## 2단계: Apps Script 열기

1. 스프레드시트 상단 메뉴: **확장 프로그램 → Apps Script** 클릭
2. 기존에 있는 코드를 전부 지우고 아래 코드를 붙여넣기

---

## 3단계: 아래 코드 전체 복사 후 붙여넣기

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // 첫 번째 행이 비어있으면 헤더 자동 생성
    if (sheet.getLastRow() === 0) {
      const headers = Object.keys(data);
      sheet.appendRow(headers);
    }

    // 데이터 행 추가
    const values = Object.values(data);
    sheet.appendRow(values);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 4단계: 웹 앱으로 배포

1. 오른쪽 상단 **배포 → 새 배포** 클릭
2. 유형 선택: **웹 앱** 선택
3. 설정:
   - 설명: `더박스 울산 상담 폼`
   - 다음 사용자로 실행: **나(본인 계정)**
   - 액세스 권한: **모든 사용자**
4. **배포** 클릭
5. 구글 권한 요청이 뜨면 **액세스 허용** 클릭
6. **웹 앱 URL** 복사 (https://script.google.com/macros/s/... 형태)

---

## 5단계: URL을 폼에 붙여넣기

`artifacts/thebox-ulsan/consultation/index.html` 파일을 열어서:

```javascript
// 이 줄을 찾아서
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// 복사한 URL로 교체
const SCRIPT_URL = 'https://script.google.com/macros/s/여기에붙여넣기/exec';
```

---

## 완료!

이후 상담 폼을 제출하면 구글 시트에 자동으로 한 행씩 기록됩니다.
