var addedCardList="";
        var CARD_NO_ARR = new Array(16);

        var count = 0;
        var tryGame = 0;  // 도전 횟수
        var score = 0;    // 점수
        // 이미지 배치하기
        function arrangeImg()
        {
            var cardTot = 16;               // 이미지 총 개수
            for(var i=1; i<=16; i++)
            {
                var cardIdx = getRandNum(cardTot-(i-1));
                while(addedCardList.indexOf(";"+cardIdx+";") >= 0)
                {
                    if(cardIdx==16)
                    {
                        cardIdx = 1;
                    }
                    else
                    {
                        cardIdx++;
                    }
                }
                // index는 0부터니까(i-1)
                CARD_NO_ARR[i-1]=cardIdx;
                addedCardList += ";"+cardIdx+";";
            }
        }
        // 이미지 출력하기
        function showImgList()
        {
            for(var i = 0; i < CARD_NO_ARR.length; i++)
            {
                var IMG_NAME = CARD_NO_ARR[i];
                // 9~16까지의 이미지는 1~8까지의 이미지와 같음
                if(IMG_NAME > 8)
                {
                    IMG_NAME = IMG_NAME-8
                }
                var CARD_IMG_OBJ = document.getElementById("CARD"+(i+1));
                CARD_IMG_OBJ.src = "../image/"+IMG_NAME+".jpg";

                CARD_IMG_OBJ.success = "N";
				CARD_IMG_OBJ.className = "cardIMG NOT_VISIBLES";
            }
        }
        // 이미지 클릭했을때
        function clickIMG(idx)
        {   
            var state = "open";         // 클릭한 이미지 상태의 default는 open
            if(document.getElementById("CARD"+idx).className.indexOf("NOT_VISIBLES") > 0)
            {
                state = "close";
            }
            if(state == "close")
            {
                openIMG(idx);
            }
        }
        // 이미지 공개하기
        var OPENIMG="";
        function openIMG(idx)
        {
            if(OPENIMG)
            {   // 선택한 두 개의 이미지가 같을 경우
                if(document.getElementById("CARD"+OPENIMG).src == document.getElementById("CARD"+idx).src)
				{
                    
					setTimeout(function() { imgSuccess(OPENIMG, idx); }, 500);
				}
                // 다를 경우
                else
				{
					setTimeout(function() { imgFail(OPENIMG, idx); }, 500);
				}
            }
            document.getElementById("CARD"+idx).className = "cardIMG VISIBLES";
            if(!OPENIMG)
            {
                OPENIMG=idx;
            }
        }
        // 선택한 두 이미지가 같은 경우
        function imgSuccess(preIMG, nowIMG)
        {
            document.getElementById("CARD"+preIMG).success = "Y";
			document.getElementById("CARD"+nowIMG).success = "Y";
			OPENIMG = "";
            count++;
            tryUp();
            scorePlus();        // +10점
            allComplete();
        }
        // 게임 다 끝냈는지 검사
        function allComplete()
		{         
            for(var i=1; i <= 16; i++)
				{
					if(document.getElementById("CARD"+i).success != "Y")
					{
						return false;
					}
				}
			alert("STAGE1: 같은 그림을 모두 찾았습니다!\nSTAGE1 클리어!");
		}
        // 선택한 두 이미지가 다를 경우
        function imgFail(preIMG, nowIMG)
		{
            scoreMinus();       // -10점
			document.getElementById("CARD"+preIMG).success = "N";
			document.getElementById("CARD"+nowIMG).success = "N";

			document.getElementById("CARD"+preIMG).className = "cardIMG NOT_VISIBLES";
			document.getElementById("CARD"+nowIMG).className = "cardIMG NOT_VISIBLES";
			OPENIMG = "";
            tryUp();
		}
        function scorePlus()        // 점수 10점 득점+화면에 결과 출력
        {
            score += 10;
            document.getElementById("score").innerHTML = score;
        }
        function scoreMinus()      // 점수 10점 실점+화면에 결과 출력
        {
            score -= 10;
            document.getElementById("score").innerHTML = score;
        }
        function tryUp()            // 도전 횟수
        {
            tryGame++;         // 도전 횟수 증가
            document.getElementById("try").innerHTML = tryGame;         // 도전 횟수 화면에 출력하기
        }
        // 변수 count, tryGame, score의 값+출력 초기화
        function initValue()
        {
            count = 0;
            tryGame = 0;
            score = 0;
            document.getElementById("try").innerHTML = tryGame;
            document.getElementById("score").innerHTML = score;
        }
        // START 버튼 클릭시, 발생
        function init()
        { 
            addedCardList="";
            CARD_NO_ARR=new Array(16);
            if (count > 0)               // 이미 게임 시작한 후, 초기화
            {
                alert("STAGE1를 다시 시작합니다.\n다시 시작시, 도전 횟수와 점수는 초기화됩니다.");
                initValue();
            }
            
            arrangeImg();              // 이미지 배치
            showImgList();             // 이미지 보여주기
        }
        // 랜던 발생 함수
        function getRandNum(maxNum)
        {
            // 1~ maxNum 사이의 난수(=정수) 값
            return Math.floor(Math.random()*(maxNum-1))+1;
        }
        // STAGE2로 넘어가기
        function nextGame()
        {
            if(count == 8)
            {
                alert("STAGE2 페이지로 이동합니다.");
                window.open("STAGE2(단어).html", "_blank");        // 새로운 페이지에 2단계로 넘어가기
            }
            else
            {
                alert("STAGE1을 클리어하지 못했습니다.\nSTAGE2는 STAGE1 성공 후, 진입가능합니다.");
            }
        }