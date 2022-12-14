var files = ["../image/강아지.jpg", "../image/비행기.jpg", "../image/눈사람.jpg", "../image/사과.jpg", "../image/자동차.jpg", 
        "../image/시계.jpg", "../image/해바라기.jpg", "../image/학교.jpg"];       // 기본 8개의 이미지 배열
        //var result = ["강아지", "비행기", "눈사람", "사과", "자동차", "시계", "해바라기", "학교"];

        var count=0;
        var tryGame=0;  // 도전 횟수
        var score=0;    // 점수
        var imgs = new Array();         // 이미지 객체 저장할 배열
        function reImg()
        {
            /*for(var i=0; i < files.length; i++)
            {
                imgs[i] = new Image();  //이미지 객체 생성
                imgs[i].src = files[i];
            }*/
            var flen = files.length;        // files의 길이
            var test=new Array(flen);       // 발생할 난수 담을 배열
            for(var i=0; i < flen; i++)
            {
                var gR = getRandom(flen);             // 랜덤 값 발생
                //alert(i+"번째 gR:" + gR);  
                while(test.indexOf(gR) != -1)           // 현재 발생한 랜덤값이 이전 랜덤값 배열에 있다면
                {
                    //gR = getRandom(flen-i);             // 다시 랜덤값 발생
                   // alert("while문 안에서  gR: "+gR);
                   if(gR==(flen-1))
                    {
                        gR = 1;
                    }
                    else
                    {
                        gR++;
                    }
                }
                imgs[i] = new Image();  //이미지 객체 생성
                imgs[i].src = files[gR];
                test.push(gR);
                //alert(i+"번째 test : " + test+" 사진은 : "+files[gR]);        // 난수와 집어넣은 이미지
                //alert(files[gR]); 
            }
        }
        function getRandom(num)
        {
            var rnum = Math.floor(Math.random()*num);       //0부터 num-1까지(== files-1) 랜덤
            return rnum;
        }
    
        window.onload=wStart;                // localStorage에 추가된 것을 반영
        var tmp1 = new Array();
        function wStart(){
            var value1 = localStorage.getItem("localImgFile");
            var value2 = localStorage.getItem("localImgName");
            if(value1 !=null){
                var storedStorage1=JSON.parse(value1);
                for(var i=0; i<storedStorage1.length; i++)
                {
                    //alert(storedStorage1[i]);
                    files.push(storedStorage1[i]);
                    tmp1.push(storedStorage1[i]);
                }
            }
        }
        
        // '시작' 버튼 클릭 -> 첫 번째 이미지 출력
        function startGame2()
        {
            var imgObj = document.getElementById('thisImg');
            
            if(count > 0)
            {
                alert("STAGE2를 다시 시작합니다. (다시 시작시, 도전 횟수와 점수는 초기화됩니다.");            
                initValue();          
                reImg();
                imgObj.src = imgs[count].src;
                
            }
            else
            {
                reImg();
                imgObj.src = imgs[count].src;
            }
            //imgObj.src = imgs[count].src;
        }
        // 변수값과 화면표시값 초기화
        function initValue()
        {
            count = 0;
            tryGame = 0;
            score = 0;
            document.getElementById('imgName').value = "";
            document.getElementById("try").innerHTML = tryGame;
            document.getElementById("score").innerHTML = score;
            alert("initValue에서 count : " + count);
        }
        // '정답' 버튼 클릭 -> 정답 판별하기
        function isCorrect()
        {
            tryGame++;          // 도전 횟수 증가
            var answer = document.getElementById('imgName');// id가 imgName(텍스트)인 태그 가져오기    
            var result = checkFname(imgs[count].src);
            // 입력된 답과 이미지명 비교
            if( answer.value == result)             // 정답
            {
                alert("정답입니다.");
                count++;                // 다음 이미지 출력 위해 count 증가
                answer.value=""         // 텍스트 입력창 초기
                scorePlus()             // +10점
                nextImg(count);         // 다음 이미지 출력으로 넘어가기
            }
            else                                            // 오답
            {
                alert("오답입니다.");
                scoreMinus();           // -10점 
                answer.focus();         // 텍스트 입력창으로 커서 옮기기
            }
            document.getElementById("try").innerHTML = tryGame;
        }
        function scorePlus()
        {
            score += 10;
            document.getElementById("score").innerHTML = score;
        }
        function scoreMinus()
        {
            score -= 10;
            document.getElementById("score").innerHTML = score;
        }

        // 다음 이미지 보여주기 (조건 : 입력한 답이 정답일 경우에만 함수가 호출됨)
        function nextImg(count)
        {
            var imgObj = document.getElementById('thisImg');
            if(count == files.length)                           // count의 값이 files의 길이와 같을 경우== 이미지를 다 출력했을 경우 == 게임 끝
            {
                alert(tryGame+"번의 시도 끝에, 2단계를 클리어!\n"+"총 "+score+"점 득점했습니다.");
                imgObj.src = "../image/final.jpg";
            }
            else                                                // 이미지가 남아 있는 경우
            {
                var imgObj = document.getElementById('thisImg');
                imgObj.src = imgs[count].src;
            }
        }
        // 이미지 파일 추가하기
        function addImg()
        {
            var filename = document.getElementById('file');
            if(filename.value == "")
            {
                alert("파일을 선택하세요");
                return false;
            }
            else
            {
                var refile = nowFile();
                var fpath = 'image/'+refile[0];      // 파일 경로

                files.push(fpath);           // 이미지 파일 배열, files에 추가
                tmp1.push(fpath);            // localStorage에 이용하기 위해, tmp1에 파일 경로
                alert("이미지 추가완료");
 
                reImg();                    // 이미지 객체 호출
                localStorage.setItem("localImgFile", JSON.stringify(tmp1));   //localStorage에 추가한 파일 경로 저장하기    
            }
        }
        // 파일 경로와 파일명 구하기
        var nowFile = function (){
            //input file 태그.
			var fd = document.getElementById('file');
            //파일 경로.
			var filePath = file.value;
            //전체경로를 \ 나눔.
			var filePathSplit = filePath.split('\\'); 
			//전체경로를 \로 나눈 길이.
			var filePathLength = filePathSplit.length;
			//마지막 경로를 .으로 나눔.
			var fileNameSplit = filePathSplit[filePathLength-1].split('.');
			//파일명 : .으로 나눈 앞부분
			var fileName = fileNameSplit[0];
            // 상대경로
            var filePath2 = filePath.replace('C:\\fakepath\\','');
            return [filePath2, fileName];           // 상대경로와 파일명 반환
        }
        // 파일 경로와 파일명 구하기
        function checkFname(fpath1){
            // 파일 경로
            var fpath2 = decodeURI(fpath1);
            //파일 경로.
			var filePath = fpath2;
            //전체경로를 / 나눔.
			var filePathSplit = filePath.split('/'); 
			//전체경로를 /로 나눈 길이.
			var filePathLength = filePathSplit.length;
			//마지막 경로를 .으로 나눔.
			var fileNameSplit = filePathSplit[filePathLength-1].split('.');
			//파일명 : .으로 나눈 앞부분
			var fileName = fileNameSplit[0];
            return (fileName);           // 이미명 반환
        }