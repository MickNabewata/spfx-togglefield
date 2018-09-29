import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './SampleCustomizer.module.scss';

// Office UI FabricのToggleコントロールをインポート
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

/** このReactコンポーネントが受け取るの形式定義 */
export interface ISampleCustomizerProps {

  /** チェックの初期状態 */
  defaultChecked : boolean;

  /** チェックが変更された時のコールバック */
  checkedCallBack : (checked : boolean) => {};
}

/** このReactコンポーネントのステートの形式定義 */
export interface ISampleCustomizerStates {
}

/** 描画用Reactコンポーネント */
export default class SampleCustomizer extends React.Component<ISampleCustomizerProps, ISampleCustomizerStates> {

  /**
   * コンストラクタ
   */
  public constructor()
  {
    // 継承元コンストラクタの呼び出し
    super();

    // ステートの初期化
    this.state = {};
  }

  /**
   * Reactコンポーネントがマウントされた後のイベント
   */
  @override
  public componentDidMount(): void {
  }

  /**
   * Reactコンポーネントがマウントされる直前のイベント
   */
  @override
  public componentWillUnmount(): void {
  }

  /**
   * レンダリング
   */
  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={ styles.cell }>
        <Toggle
          defaultChecked={ this.props.defaultChecked }
          onChanged={ this.props.checkedCallBack  }
        />
      </div>
    );
  }
}
