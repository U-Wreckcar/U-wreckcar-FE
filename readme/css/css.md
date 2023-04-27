# CSS Style

### Selectors

-  재사용하는 셀렉터는 접두사를 이용해서 작성합니다.

```css
Bad .wraper {
   ...;
}
Good .l_wraper {
   ...;
}
```

-  요소를 셀렉터로 이용하는건 자제합니다( 특히 ul, li)
   <br>ex) nav바를 제작할 때 li 안에 다른 메뉴를 만들 때 복잡해질 수 있습니다.

```css
Bad .item_box > li {
   ...;
}
Good .menu_box.menu_list {
   ....;
}
```
