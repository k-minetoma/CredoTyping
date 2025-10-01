import { Question, Dialogue } from '../types';

export const CREEDS: Question[] = [
  { japanese: "挑戦を恐れない", romaji: "chousen o osorenai" },
  { japanese: "顧客第一主義", romaji: "kokyaku daiichi shugi" },
  { japanese: "仲間と成長する", romaji: "nakama to seichou suru" },
  { japanese: "誠実に行動する", romaji: "seijitsu ni koudou suru" },
  { japanese: "地域社会に貢献する", romaji: "chiiki shakai ni kouken suru" },
  { japanese: "人生まるごと楽しむ", romaji: "jinsei marugoto tanoshimu" },
];

export const STORY_DATA: { opening: Dialogue[]; ending: Record<string, Dialogue[]> } = {
  opening: [
    { character: 'あなた', text: '社長、アンクスってどんな会社か教えてください！！' },
    { character: '社長', text: 'もちろん！アンクスは鹿児島に根ざしたIT企業で、システム開発やクラウド、オンライン事業などを展開しているよ。' },
    { character: '社長', text: '最近では鹿児島初のAI・DX拠点「Microsoft Base Kagoshima」 を設立したんだ。鹿児島でAI・DXをどんどん進めていくよ！' },
    { character: 'あなた', text: 'えっ、すごいですね！そんな最先端の拠点をつくるなんて驚きです。' },
    { character: '社長', text: 'そうでしょう？それに事業だけじゃなくて、社員の人生も大事にしたいんです。' },
    { character: '社長', text: 'だから「おしゃれ手当」や「健康増進手当」 を新設しました。社員一人ひとりが“人生まるごと楽しむ”ことを応援しているんだ。' },
    { character: 'あなた', text: 'ユニークな制度ですね！働きやすさも感じます。' },
    { character: '社長', text: 'ありがとう。実は、私が社長になった頃は社員40名でしたが、今では100名を超える規模に急成長しました。' },
    { character: '社長', text: 'でも「安定」より「挑戦」を選び続け、鹿児島から「こんなに面白い会社があるんだ！」と全国に発信していきたいんです。' },
    { character: '社長', text: '私たちのビジョンは、社員500人・売上100億円。一緒にその未来をつくっていこう！' },
    { character: 'あなた', text: 'はい、ぜひ頑張ります！' },
    { character: '社長', text: 'よーし、そのための「クレド」はもちろん覚えたよね？' },
    { character: 'あなた', text: 'ええっと・・・たしか・・・なんだっけ？' },
    { character: '社長', text: 'おいおいしっかりしてくれよ！！それじゃゲームで覚えよう' }
  ],
  ending: {
    S: [
      { character: '社長', text: '完璧だ！君のタイピングに我が社の未来を見たよ。まさにアンクスのエースだ！一緒に世界を驚かせよう！' },
      { character: 'あなた', text: 'はい！！アドレナリン全開でこれからも頑張ります！！' },
    ],
    A: [
      { character: '社長', text: 'すごいじゃないか！クレドはもうバッチリだな。そのポテンシャル、非常に高く評価するよ。次はSランクを目指してみよう！' },
      { character: 'あなた', text: 'はい！！アドレナリン全開でこれからも頑張ります！！' },
    ],
    B: [
      { character: '社長', text: 'ナイスプレイ！基本はできているな。次はコンボを意識すると、もっとスコアが伸びるはずだ。期待しているよ！' },
      { character: 'あなた', text: 'はい！！アドレナリン全開でこれからも頑張ります！！' },
    ],
    C: [
      { character: '社長', text: 'まだまだこれからだな！だが、挑戦したことが何より素晴らしい。失敗は成功のもとだ。もう一度、行ってみよう！' },
      { character: 'あなた', text: 'はい！！アドレナリン全開でこれからも頑張ります！！' },
    ],
  }
};
