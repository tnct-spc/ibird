1.Java8以上をダウンロード、環境を作る
2.下記URLからTika-serverをダウンロード
http://tika.apache.org/download.html
3.Mavenをインストール(ubuntuではaptで入りました)
4.pipをインストール
5.tika-pythonをインストール(pip install tika)

ApacheTika
->http://tika.apache.org
tika-python(github)
->https://github.com/chrismattmann/tika-python
参考したページ
->https://kiito.hatenablog.com/entry/2016/04/24/073441

-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
metadataのtitleから引っ張ってきている
=>>内容と関係なくてもタイトルに書いてあることが取得される「document001.pdf」など
pdf->プロパティ->ドキュメントのタイトルが「なし」になっている場合は取得できない
word等での作成時に自動で設定されるかは未確認
  
