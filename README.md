# Pink Formula

Use Themekit to downlad, watch, and push
https://shopify.github.io/themekit/commands/`

# Setup

## Mac
* Run following command to local env \
`brew tap shopify/shopify` \
`brew install themekit`

* Then generate password for your account from theme kit app in the store
* After getting password from theme kit app run the following command in theme root folder on your local env \
`theme get --password=YOUR-THEME-KIT-PASSWORD--store="pinkformula.myshopify.com" --themeid=130160197878`
* Once the aboive command run sucessfully and you got the `config.xml` in theme root folder. You can run `theme watch` to sync theme with online store and get to see your changes.