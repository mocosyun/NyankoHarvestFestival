// title.js
var start_label;
var rank_label;
var help_label;
var startBox;
var rankBox;
var helpBox;

var start_flg = false;
var rank_flg = false;
var help_flg = false;

audioEngine = cc.audioEngine;

var title = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();
    if (!audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm, true);
    }

    var title_back = new cc.Sprite(res.title_bg_png);
    title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var title_back_layer = cc.Layer.create();
    title_back_layer.addChild(title_back);
    this.addChild(title_back_layer);

    var title_label = new cc.Sprite(res.title_png);
    title_label.setPosition(cc.p(size.width * 0.5, size.height * 0.8));
    var title_label_layer = cc.Layer.create();
    title_label_layer.addChild(title_label);
    this.addChild(title_label_layer);

    start_label = new cc.Sprite(res.title_start0_png);
    start_label.setTag(1);
    start_label.setPosition(cc.p(size.width * 0.49, size.height * 0.4));
    //var start_label_layer = cc.Layer.create();
    //start_label_layer.addChild(start_label);
    //this.addChild(start_label_layer);
    this.addChild(start_label);

    rank_label = new cc.Sprite(res.title_ranking0_png);
    rank_label.setTag(2);
    rank_label.setPosition(cc.p(size.width * 0.5, size.height * 0.2));
    //var rank_label_layer = cc.Layer.create();
    //rank_label_layer.addChild(rank_label);
    //this.addChild(rank_label_layer);
    this.addChild(rank_label);

    help_label = new cc.Sprite(res.help0_png);
    help_label.setTag(3);
    help_label.setPosition(cc.p(size.width * 0.9, size.height * 0.1));
    //var help_label_layer = cc.Layer.create();
    //help_label_layer.addChild(help_label);
    //this.addChild(help_label_layer);
    this.addChild(help_label);

    // タップイベントリスナー登録
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: this.onTouchBegan,
      onTouchMoved: this.onTouchMoved,
      onTouchEnded: this.onTouchEnded
    }, this);
    return true;
  },
  onTouchBegan: function(touch, event){
    startBox = start_label.getBoundingBox();
    rankBox = rank_label.getBoundingBox();
    helpBox = help_label.getBoundingBox();
    if (cc.rectContainsPoint(startBox, touch.getLocation())){
      start_label.setTexture(res.title_start1_png);
      start_flg = true;
    }
    if (cc.rectContainsPoint(rankBox, touch.getLocation())){
      rank_label.setTexture(res.title_ranking1_png);
      rank_flg = true;
    }
    if (cc.rectContainsPoint(helpBox, touch.getLocation())){
      help_label.setTexture(res.help1_png);
      help_flg = true;
    }
    return true;
  },
  onTouchMoved: function(touch, event){},
  onTouchEnded: function(touch, event){
    if(start_flg){
      start_flg = false;
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
      audioEngine.playEffect(res.se_button);
      cc.director.runScene(new gameScene());
    }
    if(rank_flg){
      rank_flg = false;
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
      audioEngine.playEffect(res.se_button);
      cc.director.runScene(new rankingScene());
    }
    if(help_flg){
       help_flg = false;
       audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
       audioEngine.playEffect(res.se_button);
       cc.director.runScene(new helpScene());
     }
  },
});

var titleScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var titlelayer = new title();
    this.addChild(titlelayer);
  }
});
