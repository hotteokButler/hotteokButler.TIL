# 쿠키를 이용한 팝업 레이어 


## 쿠키 생성

```
    <script language="Javascript">
      //쿠키 셋팅하기
      function setCookie(name, val, expiredays) {
        let today = new Date();
        today.setDate(today.getDate() + expiredays);
        document.cookie = name + "=" + val + "; path=/; expires=" + today.toGMTString() + ";";
      }
    </script>

```



## 팝업창제어

```

     const popUps = document.querySelectorAll(".pop_up");
      let cookiedata = document.cookie;
      let cookieArray = cookiedata.split(";");

      popUps.forEach((popup) => {
        popup.addEventListener("click", function (e) {
          const target = e.target;
          if (target.type !== "checkbox" && target.type !== "button") {
            return;
          }
          //checkbox
          else if (e.target.type === "checkbox") {
            e.preventDefault();

            let check = e.target.checked;
            if (check) {
              setCookie(e.currentTarget.id, "path", 1);
              popup.style.visibility = "hidden";
            }
          }
          //닫기
          else if (e.target.type === "button") {
            let check = e.target.checked;
            popup.style.visibility = "hidden";
          }
        });
      });

      popUps.forEach((popup) => {
        for (const index in cookieArray) {
          if (cookieArray[index].trim() !== `${popup.id}=path`) {
            popup.style.visibility = "visible";
          } else if (cookieArray[index].trim() === `${popup.id}=path`) {
            popup.style.visibility = "hidden";
            return;
          }
        }
      });


```




### 전체코드


```
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <!-- POPUP  스크립트 -->
    <script language="Javascript">
      //쿠키 셋팅하기
      function setCookie(name, val, expiredays) {
        let today = new Date();
        today.setDate(today.getDate() + expiredays);
        document.cookie = name + "=" + val + "; path=/; expires=" + today.toGMTString() + ";";
      }
    </script>
  </head>
  <body>
    <div class="pop_up" id="pop_up1">
      <div class="pop_img"><img src="" alt="" /></div>
      <form name="pop_up_footer">
        <input type="checkbox" name="pop_up_footer" />
        <label class="pop_up_desc">오늘 하루 이 창을 열지 않음</label>
        <input type="button" value="[닫기]" id="pop_up_close" />
      </form>
    </div>
    <div class="pop_up" id="pop_up2" style="left: 322px">
      <div class="pop_img"><img src="" alt="" /></div>
      <form name="pop_up_footer">
        <input type="checkbox" name="pop_up_footer" />
        <label class="pop_up_desc">오늘 하루 이 창을 열지 않음</label>
        <input type="button" value="[닫기]" id="pop_up_close" />
      </form>
    </div>
    <div class="pop_up" id="pop_up3" style="left: 634px">
      <div class="pop_img"><img src="" alt="" /></div>
      <form name="pop_up_footer">
        <input type="checkbox" name="pop_up_footer" />
        <label class="pop_up_desc">오늘 하루 이 창을 열지 않음</label>
        <input type="button" value="[닫기]" id="pop_up_close" />
      </form>
    </div>

    <!--	팝업레이어 -->
    <script language="Javascript">
      const popUps = document.querySelectorAll(".pop_up");
      let cookiedata = document.cookie;
      let cookieArray = cookiedata.split(";");

      popUps.forEach((popup) => {
        popup.addEventListener("click", function (e) {
          const target = e.target;
          if (target.type !== "checkbox" && target.type !== "button") {
            return;
          }
          //checkbox
          else if (e.target.type === "checkbox") {
            e.preventDefault();

            let check = e.target.checked;
            if (check) {
              setCookie(e.currentTarget.id, "path", 1);
              popup.style.visibility = "hidden";
            }
          }
          //닫기
          else if (e.target.type === "button") {
            let check = e.target.checked;
            popup.style.visibility = "hidden";
          }
        });
      });

      popUps.forEach((popup) => {
        for (const index in cookieArray) {
          if (cookieArray[index].trim() !== `${popup.id}=path`) {
            popup.style.visibility = "visible";
          } else if (cookieArray[index].trim() === `${popup.id}=path`) {
            popup.style.visibility = "hidden";
            return;
          }
        }
      });
    </script>
  </body>
</html>


```
