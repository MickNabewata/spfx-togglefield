import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  SPHttpClient
 } from '@microsoft/sp-http';

import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'SampleCustomizerFieldCustomizerStrings';
import SampleCustomizer, { ISampleCustomizerProps } from './components/SampleCustomizer';

/**
 * フィールドカスタマイザーのプロパティ定義
 * serve.jsonで記述したプロパティが連携される
 */
export interface ISampleCustomizerFieldCustomizerProperties {
}

/** フィールドカスタマイザークラス */
export default class SampleCustomizerFieldCustomizer
  extends BaseFieldCustomizer<ISampleCustomizerFieldCustomizerProperties> {

  private fieldValueMap = { 'はい' : true, 'いいえ' : false };

  /** 
   * 初期化イベント
   * Promise.resolve()が呼び出されるまでonRenderCellの呼び出しを待機する
   */
  @override
  public onInit(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * セルのレンダリングイベント
   * ReactDOM.renderされた内容がフィールドに記述される
  */
  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {

    // フィールドの現在の値をbooleanにマッピング
    const fieldValue : boolean = this.fieldValueMap[event.fieldValue];

    // アイテムIDを取得
    let itemId : number | null = null;
    let idField = event.listItem.fields.filter((val, idx) => { return val.internalName == 'ID'; });
    if(idField.length == 1)
    {
      itemId = event.listItem.getValue(idField[0]);
    }

    // React要素を取得
    const sampleCustomizer: React.ReactElement<{}> =
      React.createElement(
        SampleCustomizer, 
        {
          defaultChecked : fieldValue,
          checkedCallBack : (checked) =>  { 
            this.onToggleChanged(
              this.context.spHttpClient,
              this.context.pageContext.web.absoluteUrl,
              this.context.pageContext.list.title,
              itemId,
              checked
              ); 
          }
        } as ISampleCustomizerProps);

    // 描画
    ReactDOM.render(sampleCustomizer, event.domElement);
  }

  /**
   * 終了イベント
   * オブジェクトの破棄を行う
   * このサンプルでは前段でReactDom.renderをしたので、
   * ReactDOM.unmountComponentAtNodeを呼び出してDOM要素を破棄している
   */
  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }

  /**
   * トグルの切り替えイベント
   * 該当アイテムの完了列を更新します。
   */
  private onToggleChanged(client : SPHttpClient, webUrl : string, listTitle : string, itemId : number, checked : boolean) : void {
    try
    {
      if(!itemId)
      {
        alert('アイテムIDが取得できませんでした。ビューにID列を含めていることを確認してください。');
      }
      else
      {
        const apiUrl = `${ webUrl }/_api/web/lists/GetByTitle('${ listTitle }')/items(${ itemId })`;
        const body :string = JSON.stringify({
          '__metadata' : { 'type' : 'SP.Data.SampleListListItem' },
          'completed' : checked
        });

        client.post(
          apiUrl,
          SPHttpClient.configurations.v1,
          {
            headers: [
              ['accept', 'application/json;odata=nometadata'],
              ['Content-type', 'application/json;odata=verbose'],
              ['odata-version', ''],
              ['X-HTTP-Method', 'MERGE'],
              ['IF-MATCH', '*' ]
            ],
            body : body
          }
        ).then(
          (res) => {
            if(res.ok)
            {
            }
            else
            {
              res.text().then(
                (val) => { alert(`status : ${ res.status }, error : ${ val }`); },
                (err) => { alert(`text retrival error : ${ err }`); }
              );
            }
          },
          (err) => { alert(err); }
        );
      }
    }
    catch(err)
    {
      alert(err);
    }
  }
}
