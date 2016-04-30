var React    = require('react');
var ReactDOM = require('react-dom');
var Fluxxor  = require('fluxxor');

var constants = {
    UPDATE_COUNTER: "UPDATE_COUNTER"
};

/*
 * Store
 */
var CounterStore = Fluxxor.createStore({
    initialize: function() {
        this.counter = 0;
        // UPDATE_COUNTERという種類のActionに対して、
        // Store自身のメソッドであるonUpdateCounterを実行するように
        // 対応付け（バインド）している
        this.bindActions(
            constants.UPDATE_COUNTER, this.onUpdateCounter
        );
    },
    onUpdateCounter: function(payload) {
        this.counter = this.counter + payload.value;
        // Storeを監視しているViewに伝えるイベントを発生させる手続き
        this.emit('change');
    },
    getState: function() {
        return { counter: this.counter };
    }
});

/*
 * Action
 */
var actions = {
    // this.getFluxで取得されたFluxオブジェクトから参照される関数
    // アクションの識別子とパラメータオブジェクトのセット
    // Storeに対しての操作要求
    plusCounter: function() {
        this.dispatch(constants.UPDATE_COUNTER, {value: 1});
    },
    minusCounter: function() {
        this.dispatch(constants.UPDATE_COUNTER, {value: -1});
    }
};

// Reactから利用するMixin
// ReactのMixin機能を使って
// Fluxが持っているFluxMixinとStoreWatchMixinをコンポーネントに
// Mixinしている
// FluxMixinをReactコンポーネントにmixinすると
// this.getFlux()でFluxオブジェクトにアクセスできる
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

/*
 * View
 */
// Reactの親コンポーネント
var CounterApp = React.createClass({
    // ReactのMixin機能
    // StoreWatchMixinにStore名を渡すと
    // このViewコンポーネントが監視して
    // データ変更イベントが届くごとに反応する
    // 内部ではReactのcomponentDidMountやcomponentWillUnmountなどの
    // ライフサイクルイベントで対象のStoreのchangeイベントをバインドする実装になっている
    mixins: [ FluxMixin, StoreWatchMixin("CounterStore") ],
    // Fluxxorからの強制実装
    // StoreのgetStateの返却値を使い
    // 自動でsetStateしたり、ReactのgetInitialStateのタイイングで
    // Stateを自動で初期化したりする。
    getStateFromFlux: function() {
        return this.getFlux()
            .store('CounterStore')
            .getState();
    },
    render: function() {
        return <Counter value={this.state.counter} />;
    }
});

var Counter = React.createClass({
    mixins: [ FluxMixin ],
    propTypes: {
        value : React.PropTypes.number.isRequired
    },
    // 親へのイベントの伝搬ではなく
    // Reactコンポーネントの外の世界へ
    // Propsで親の関数を子に渡す必要がなくなた
    onClickPlus: function() {
        return this.getFlux().actions.plusCounter();
    },
    onClickMinus: function() {
        return this.getFlux().actions.minusCounter();
    },
    render: function() {
        return (
            <div>
                <span>count: {this.props.value}</span>
                <div>
                    <button onClick={this.onClickPlus}>
                        +1
                    </button>
                    <button onClick={this.onClickMinus}>
                        -1
                    </button>
                </div>
            </div>
        );
    }
});

var stores = { CounterStore: new CounterStore() };
// FluxオブジェクトがDispatcherを内包している
// FluxオブジェクトはStoreとActioを知っている
// ActionがDispatcherを経由してStoreに届くまでの処理は隠蔽されている
var flux = new Fluxxor.Flux(stores, actions);

ReactDOM.render(
    <CounterApp flux={flux} />,
    document.getElementById('app-container')
);