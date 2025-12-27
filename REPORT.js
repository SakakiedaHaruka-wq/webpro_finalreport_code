"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render('top');
});

let pokemons = [
    { id: 3,   name: "フシギバナ", h:80,  a:82,  b:83,  c:100, d:100, s:80 },
    { id: 6,   name: "リザードン", h:78,  a:84,  b:78,  c:109, d:85,  s:100 },
    { id: 9,   name: "カメックス", h:79,  a:83,  b:100, c:85,  d:105, s:78 },
    { id: 25,  name: "ピカチュウ", h:35,  a:55,  b:40,  c:50,  d:50,  s:90 },
    { id: 131, name: "ラプラス",   h:130, a:85,  b:80,  c:85,  d:95,  s:60 },
    { id: 133, name: "イーブイ",   h:55,  a:55,  b:50,  c:45,  d:65,  s:55 },
    { id: 143, name: "カビゴン",   h:160, a:110, b:65,  c:65,  d:110, s:30 },
    { id: 144, name: "フリーザー", h:90,  a:85,  b:100, c:95,  d:125, s:85 },
    { id: 145, name: "サンダー",   h:90,  a:90,  b:85,  c:125, d:90,  s:100 },
    { id: 146, name: "ファイヤー", h:90,  a:100, b:90,  c:125, d:85,  s:90 },
    { id: 149, name: "カイリュー", h:91,  a:134, b:95,  c:100, d:100, s:80 },
    { id: 150, name: "ミュウツー", h:106, a:110, b:90,  c:154, d:90,  s:130 },
    { id: 151, name: "ミュウ",     h:100, a:100, b:100, c:100, d:100, s:100 },
];

let monsters = [
    {
        id: 1,
        name: "ゴア・マガラ",
        species: "???",
        size: 1950.0,
        weakness: "火/龍",
        roar: "大",
        wind: "大",
        tremor: "あり",
        description: "《黒蝕竜》と呼ばれる、正体不明の謎多きモンスター。黒い外套のような巨大な翼膜を纏っており、視覚器官（眼）を持たないのが最大の特徴。\n\n眼が見えない代わりに、翼から「鱗粉」を撒き散らし、それが付着した物体の位置や熱量を感知して空間を把握する。この鱗粉は生物の神経系に侵入して身体能力を暴走させ、やがて死に至らしめる「狂竜ウイルス」を含んでおり、感染した生物は「狂竜症」を発症して凶暴化する。\n\n感知能力がピークに達すると、隠されていた触角を展開し、翼脚を「腕」として使用する六足歩行形態（狂竜化状態）へと変貌する。この状態では翼膜が禍々しく広がり、大地を隆起させるほどの剛腕と、爆発的なブレス攻撃で周囲を蹂躙する。\n\nその正体は古龍シャガルマガラの幼体であり、脱皮を繰り返して成長する特異な生態を持つ。"
    },
    {
        id: 2,
        name: "セルレギオス",
        species: "飛竜種",
        size: 1850.5,
        weakness: "雷/氷",
        roar: "大",
        wind: "大",
        tremor: "なし",
        description: "《千刃竜》の名を持つ、金色の鱗に覆われた飛竜種。「刃鱗（じんりん）」と呼ばれる鋭利な鱗は、一枚一枚が刃物のような切れ味を持ち、これを逆立たせ、射出することで対象を切り刻む。\n\n飛行能力と空中制御能力が極めて高く、《空の王者》リオレウスと互角に渡り合う実力を持つ。特徴的な形状の後脚は物を掴むことに特化しており、空中で獲物を捕獲・投擲するといった器用な戦法も見せる。射出された刃鱗を受けた生物は、動くたびに出血する「裂傷」状態に陥り、心身ともに追い詰められていく。\n\n近年まで目撃例が少なかったが、「狂竜ウイルス」の影響を受けた個体が住処を追われて各地に飛来した「セルレギオス事変」を機に、その脅威が世界中に知れ渡ることとなった。中にはウイルスを克服し、極限状態へ至った個体も確認されている。"
    },
    {
        id: 3,
        name: "リオレウス",
        species: "飛竜種",
        size: 1680.5,
        weakness: "龍/雷",
        roar: "大",
        wind: "大",
        tremor: "なし",
        description: "《空の王者》の異名で恐れられる、モンスターハンターの世界を代表する大型の飛竜。鮮やかな赤色の甲殻と巨大な翼を持ち、飛行能力に特化した進化を遂げている。\n\n上空からの急襲を得意とし、高高度から獲物を狙って滑空し、鋭い爪で拘束する。その爪には強力な猛毒が含まれており、生半可な装備のハンターであれば一撃で致命傷を負う。さらに、体内には火炎袋を持ち、口から高熱の火炎ブレスを吐き出して辺り一面を焦土と化す。\n\n縄張り意識が極めて強く、侵入者に対しては執拗なまでに攻撃を加えて排除しようとする。雌個体である「リオレイア」と共に狩りを行う姿も目撃されており、つがいでの連携攻撃は脅威そのもの。\n\n多くのハンターにとって、本種を単独で狩猟できるようになることが一人前への登竜門とされている。"
    },
    {
        id: 4,
        name: "ティガレックス",
        species: "飛竜種",
        size: 1900.0,
        weakness: "雷",
        roar: "大",
        wind: "大",
        tremor: "あり",
        description: "《轟竜》の名で知られる、原始的な骨格を残した凶暴な飛竜種。「絶対強者」とも称され、砂漠、雪山、密林など場所を選ばず獲物を求めて世界中を放浪する。\n\n飛行能力は退化しているが、その分四肢が強靭に発達しており、地上での運動能力は全モンスター中でもトップクラス。時速50kmを超える猛スピードで突進し、ドリフトしながら獲物を追い詰める姿は「走る凶器」と例えられる。\n\n最大の特徴はその咆哮であり、強靭な肺活量から繰り出される「轟音」は、至近距離では物理的な衝撃波となってハンターを吹き飛ばし、鼓膜はおろか岩盤すらも破壊する威力を持つ。\n\n怒り状態になると全身の血管が拡張して赤く染まり、防御を捨てて攻撃力と速度を極限まで高める。好物のポポを捕食するためなら、本来苦手とする寒冷地にも出没する貪欲さを持つ。"
    },
    {
        id: 5,
        name: "ジンオウガ",
        species: "牙竜種",
        size: 1650.0,
        weakness: "氷",
        roar: "大",
        wind: "小",
        tremor: "なし",
        description: "《雷狼竜》の異名を持つ、山岳地帯に生息する牙竜種。強靭な四肢と鋭い爪を持ち、その動きは「無双の狩人」と称されるほど俊敏かつアクロバティックである。\n\n単体での発電能力は低いが、周囲に生息する「雷光虫」を集める習性を持ち、彼らと共生することで膨大な電気エネルギーを得ている。戦闘中に隙を見ては雷光虫をチャージし、電力が最大まで溜まると「超帯電状態」へと移行する。\n\n超帯電状態では全身の帯電毛が逆立ち、金色の雷光を纏って攻撃力とスピードが飛躍的に向上する。サマーソルトや回転攻撃など、狼のような野性味と洗練された体術を組み合わせた連撃でハンターを翻弄する。\n\nかつて霊峰を住処としていたが、ある古龍の影響で追われ、ユクモ村近隣の渓流に姿を現すようになったという経緯を持つ。"
    },
    {
        id: 6,
        name: "ディアブロス",
        species: "飛竜種",
        size: 2300.0,
        weakness: "氷",
        roar: "大",
        wind: "小",
        tremor: "あり",
        description: "《角竜》や《砂漠の暴君》の異名で恐れられる、砂漠地帯の生態系の頂点に君臨する大型飛竜。最大の特徴であるねじれた「双角」と、全身を覆う重厚な外殻を持ち、非常に厳めしい風貌をしている。\n\n意外にも食性は完全な草食性で、サボテンを主食としている。しかし、餌場の乏しい砂漠で生き抜くために縄張り意識が異常なほど強く、侵入者に対しては草食動物とは思えないほどの獰猛さで襲い掛かる。地中潜行能力に特化しており、音を頼りに外敵の位置を把握し、足元から突き上げる奇襲攻撃を得意とする。\n\nその咆哮は「轟音」と呼ぶにふさわしく、至近距離では鼓膜を破壊し、ハンターを気絶させるほどの音圧を誇る。また、興奮時には血流が増加し、痛みや疲労を無視して暴れ狂う戦鬼と化す。\n\n一部の地域では、片方の角を失い、返り血で赤く染まった「片角のマオウ」と呼ばれる伝説的な個体の存在も噂されている。"
    },
    {
        id: 8,
        name: "ダラ・アマデュラ",
        species: "古龍種",
        size: 44039.7,
        weakness: "龍/雷",
        roar: "特大",
        wind: "特大",
        tremor: "あり",
        description: "《蛇王龍》と称される、生物の常識を超越した超巨大古龍。全長は400メートル（44039.7cm）を超え、その身動き一つで山を削り、地殻変動を引き起こすとされる、まさに「天災」そのものの存在である。\n\n千剣山の頂に現れ、背中には「剣鱗」「扇刃」と呼ばれる巨大な刃が無数に立ち並んでいる。正体不明の青白いエネルギーを司り、口から放つ極大のブレスは地形をも消し飛ばす威力を誇る。さらに、咆哮に呼応して空から無数の隕石（凶星）を降り注がせる能力を持ち、相対する者は絶え間ない死の雨に晒されることとなる。\n\n太古より「千の剣を携え、大地の全てを覆す」と御伽噺に語られてきた伝説の存在。新大陸の「瘴気の谷」には、本種に酷似した、さらに巨大な古代種の骨格が確認されており、その生態は底知れない謎に包まれている。"
    },
    { 
        id: 9, 
        name: "ゴグマジオス", 
        species: "古龍種", 
        size: 4920.5,         
        weakness: "龍/火", 
        roar: "大", 
        wind: "無",
        tremor: "あり",
        description: "ドンドルマ近郊に突如現れた正体不明の超大型古龍種。《巨戟龍（きょげきりゅう）》の異名を持ち、ハンターズギルドが確認した個体は背中に一本の「撃龍槍」が刺さっているのが最大の特徴。\n\n全長約50mという巨体を誇り、全身から「超重質龍骨油」と呼ばれる重油のような粘液を垂れ流している。この油は冷えれば強固な鎧となり、獲物を絡め取る罠ともなるが、ゴグマジオス自身の高熱器官によって引火・爆発させる攻撃手段としても用いられる。\n\n非常に珍しい「火薬や硫黄を食べる」という食性を持ち、ドンドルマの武器庫を襲撃したのも火薬を摂取するためであった。油の粘着性により、襲撃した砦の兵器や人工物を身体に付着させながら移動する姿は、さながら「戦禍の亡霊」や「動く城塞」のように恐れられている。"
    },
];

let tasks = [
    { id: 1, subject: "Webプログラミング", title: "期末課題レポート", deadline: "2025-12-28", priority: "★★★★★", status: "進行中" ,memo:"コードはGithubに登録すること"},
    { id: 2, subject: "倫理学",            title: "人工妊娠中絶についてのレポート",  deadline: "2025-12-31", priority: "★★★★★",     status: "未着手" ,memo:"参考文献調べる"},
    { id: 3, subject: "データ通信",      title: "再試験対策", deadline: "2026-01-13", priority: "★★★",    status: "未着手" ,memo:"13回は範囲外、注意"},
    { id: 4, subject: "データサイエンス",        title: "期末課題レポート",   deadline: "2025-12-23", priority: "★",      status: "完了" ,memo:"提出完了、S欲しかったけど爪が甘かった…"}
];

app.get("/pokemon", (req, res) => {
    let newId = req.query.newId;
    res.render('pokemon_list', { data: pokemons, newId: newId });
});

app.get("/pokemon_detail", (req, res) => {
    let index = req.query.id;
    let target = pokemons[index];
    
    if(target) {
        res.render('pokemon_detail', { pokemon: target, index: index });
    } else {
        res.redirect('/pokemon');
    }
});

app.get("/pokemon_add", (req, res) => {
    let newId = Number(req.query.id);
    pokemons.push({
        id: newId,
        name: req.query.name,
        h: Number(req.query.h), 
        a: Number(req.query.a), 
        b: Number(req.query.b),
        c: Number(req.query.c), 
        d: Number(req.query.d), 
        s: Number(req.query.s)
    });

    pokemons.sort((a, b) => a.id - b.id);

    res.redirect('/pokemon?newId=' + newId);
});

app.get("/pokemon_delete", (req, res) => {
    let index = req.query.id;
    pokemons.splice(index, 1); 
    res.redirect('/pokemon');
});

app.get("/pokemon_edit", (req, res) => {
    let index = req.query.id;
    let target = pokemons[index];
    
    if (target) {
        res.render('pokemon_edit', { pokemon: target, index: index });
    } else {
        res.redirect('/pokemon');
    }
});

app.get("/pokemon_update", (req, res) => {
    let index = req.query.index;
    
    if (pokemons[index]) {
        pokemons[index].name = req.query.name;
        pokemons[index].h = Number(req.query.h);
        pokemons[index].a = Number(req.query.a);
        pokemons[index].b = Number(req.query.b);
        pokemons[index].c = Number(req.query.c);
        pokemons[index].d = Number(req.query.d);
        pokemons[index].s = Number(req.query.s);
    }
    res.redirect('/pokemon');
});

app.get("/mh", (req, res) => {
    let newId = req.query.newId;
    res.render('mh_list', { data: monsters, newId: newId });
});

app.get("/mh_detail", (req, res) => {
    let index = req.query.id;
    let target = monsters[index]; 
    
    if(target) {
        res.render('mh_detail', { monster: target, index: index });
    } else {
        res.redirect('/mh');
    }
});

app.get("/mh_add", (req, res) => {
    let newId = Number(req.query.id);
    
    monsters.push({
        id: newId,
        name: req.query.name,
        species: req.query.species,
        size: req.query.size,
        weakness: req.query.weakness,
        roar: req.query.roar,
        wind: req.query.wind,
        tremor: req.query.tremor,
        description: req.query.description
    });

    monsters.sort((a, b) => a.id - b.id);

    res.redirect('/mh?newId=' + newId);
});

app.get("/mh_delete", (req, res) => {
    let index = req.query.id;
    monsters.splice(index, 1); 
    res.redirect('/mh');
});

app.get("/mh_edit", (req, res) => {
    let index = req.query.id;
    let target = monsters[index];
    
    if (target) {
        res.render('mh_edit', { monster: target, index: index });
    } else {
        res.redirect('/mh');
    }
});

app.get("/mh_update", (req, res) => {
    let index = req.query.index;
    
    if (monsters[index]) {
        monsters[index].name = req.query.name;
        monsters[index].species = req.query.species;
        monsters[index].size = Number(req.query.size);
        monsters[index].weakness = req.query.weakness;
        monsters[index].roar = req.query.roar;
        monsters[index].wind = req.query.wind;
        monsters[index].tremor = req.query.tremor;
        monsters[index].description = req.query.description;
    }
    res.redirect('/mh');
});

app.get("/task", (req, res) => {
    let newId = req.query.newId;
    res.render('task_list', { data: tasks, newId: newId });
});

app.get("/task_detail", (req, res) => {
    let index = req.query.id;
    let target = tasks[index];
    if(target) {
        res.render('task_detail', { task: target, index: index });
    } else {
        res.redirect('/task');
    }
});

app.get("/task_add", (req, res) => {
    let newId = Number(req.query.id);
    tasks.push({
        id: newId,
        subject: req.query.subject,
        title: req.query.title,
        deadline: req.query.deadline,
        priority: req.query.priority,
        status: req.query.status,
        memo: req.query.memo
    });
    tasks.sort((a, b) => a.id - b.id);
    res.redirect('/task?newId=' + newId);
});

app.get("/task_delete", (req, res) => {
    let index = req.query.id;
    tasks.splice(index, 1);
    res.redirect('/task');
});

app.get("/task_edit", (req, res) => {
    let index = req.query.id;
    let target = tasks[index];
    if (target) {
        res.render('task_edit', { task: target, index: index });
    } else {
        res.redirect('/task');
    }
});

app.get("/task_update", (req, res) => {
    let index = req.query.index;
    if (tasks[index]) {
        tasks[index].subject = req.query.subject;
        tasks[index].title = req.query.title;
        tasks[index].deadline = req.query.deadline;
        tasks[index].priority = req.query.priority;
        tasks[index].status = req.query.status;
        tasks[index].memo = req.query.memo;
    }
    res.redirect('/task');
});

app.listen(9000, () => console.log("9000番ポートで待機中..."));