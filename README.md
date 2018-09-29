## 英語が苦手な方へ

日本語の情報は以下にあります。  
<a href="https://www.micknabewata.com/entry/sharepoint/spfx/fieldCustomizer-sample">SharePoint Framework フィールドカスタマイザーでリストビューに完了ボタンを付けてみた </a>

## field-customizer-sample

This sample code include a toggle to update the value of the sharePoint boolean field.

<img src="https://github.com/MickNabewata/spfx-togglefield/wiki/Images/result.jpg" />

### Building the code

#### Create SharePoint site and list

At first, you need to create a site and list.  
For this sample, following field and view is required.

##### Field

InternalName : completed  
Field type   : Boolean

##### View

Show 'ID' and 'completed' in your list view.  
Like JSLink, you need to display the columns you want to handle in the field customizer in the view.

#### Clone this repository

git clone https://github.com/MickNabewata/spfx-togglefield

#### Edit serve.json file

Open following file, and edit according to your environment.  
　　config > serve.json  
  
<img src="https://github.com/MickNabewata/spfx-togglefield/wiki/Images/serveJson2.jpg" />
