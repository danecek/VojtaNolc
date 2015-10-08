<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.phtml">Vojta Nolč</a>
        </div>
        <div>
            <ul class="nav navbar-nav">
                <li <?php echo $_SERVER['PHP_SELF'] === '/zivot.phtml' ? 'class="active"' : ''; ?> >
                    <a href="zivot.phtml">Život</a></li>
                <li  class="dropdown" class="active">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Galerie
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu" >
                        <li><a href="obrazy.phtml">Obrazy</a></li>
                        <li><a href="objekty.phtml">Objekty</a></li>
                        <li><a href="villon.phtml">Villonský cyklus</a></li>
                    </ul>
                </li>    
                <li  class="dropdown" class="active">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Texty
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu" >
                        <li><a href="vzpominka.phtml">Vzpomínka</a></li>
                        <li><a href="alsovasin.phtml">Alšova síň 1964</a></li>
                        <li><a href="galeriebratricapku.phtml">Galerie bratří Čapků 1966</a></li>
                        <li><a href="pozapomenutymalir.phtml">Pozapomenutý malíř 1996</a></li>
                        <li><a href="umenijeabstrakce.phtml">Umění je abstrakce 2003</a></li>
                    </ul>
                </li>    
                <li <?php echo $_SERVER['PHP_SELF'] === '/kontakt.phtml' ? 'class="active"' : ''; ?> >
                    <a href="kontakt.phtml">Kontakt</a></li>
            </ul>
        </div>
    </div>
</nav>