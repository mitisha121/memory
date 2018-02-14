defmodule Memory.Game do

    def new do
        %{
            vals: ["a","b","h","l","b","r","q","r","h","q","l","a","r","m","r","m"],
            squares: [nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil],
            match: "Matched",
            click: 0,
            flag: false,
            m: -1,
            n: -1,
        }
    end

    def client_view(game) do
        %{
            vals: game.vals,
            squares: game.squares,
            match: game.match,
            click: game.click,
            flag: game.flag,
            m: game.m,
            n: game.n,
        }
    end

    def change_square(i,val,sq) do
        #IO.puts(value)
        #IO.puts("in change sq")
        #IO.puts(sq)
        #IO.puts(i)
        #IO.puts(val)
        List.replace_at(sq,i,val)
    end

    def check_match(j,i,sq,mat,fl) do
        if (j>=16) do
            sq
        else
            if((Enum.at(sq,j))==(Enum.at(sq,i)) && !(i==j)) do
                #IO.puts("pls change")
                sq = change_match(i,j,sq,mat)
            end
            check_match(j+1,i,sq,mat,fl)
        end                
    end

    def call_null(i,j,sq,mat,fl,m,n) do
        #IO.puts("in call null")
        #IO.puts("value of i")
        #IO.puts((Enum.at(sq,i)))
        #IO.puts("value of j")
        #IO.puts((Enum.at(sq,j)))
        if (j>=16) do
            sq
        else
            if (Enum.at(sq,j) != nil && Enum.at(sq,j) != mat && Enum.at(sq,i) != mat && (Enum.at(sq,j)) != (Enum.at(sq,i)) && (i!=j)) do
                #IO.puts("it should'nt be here")
                #fl = true
                sq = change_null(i,j,sq)
                
            else
                call_null(i,j+1,sq,mat,fl,m,n)
            end
        end
    end

    def change_match(i,j,sq,mat) do
        #IO.puts("matched")
        sqs = List.replace_at(sq,i,mat)
        #IO.puts(sqs)
        List.replace_at(sqs,j,mat)
    end

    def change_null(i,j, sq) do
        sqs = List.replace_at(sq,i,nil)
        List.replace_at(sqs,j,nil)
    end

    def after_click(game,i) do
        val = game.vals
        sq = game.squares
        mat = game.match
        clicks = game.click + 1
        fl = !game.flag
        m = game.m
        n = game.n
        IO.puts("after click")
        IO.puts(i)
        IO.puts("main")
        #IO.puts(game.squares)
       # Enum.each(game.squares,fn(x) -> IO.puts x end)

       # if(fl) do
        #    sq = List.replace_at(sq,m,nil)
         #   sq = List.replace_at(sq,n,nil)
          #  fl = false
           # m = -1
            #n = -1
        #end

        if((Enum.at(sq, i)) == nil) do
            value = Enum.at(val,i)
            IO.puts("value")
            IO.puts(value)
            sq = change_square(i,value,game.squares)
            #Enum.each(sq,fn(x) -> IO.puts x end)
            #IO.puts(sq)
        end

        j=0

        sq = check_match(j,i,sq,mat,fl)
        
        #IO.puts("yaha pe hai")
        #IO.puts(sq)

        #obj = call_null(i,0,sq,mat,fl,m,n)
        #sq = obj.sq
        #fl = obj.flag
        #m = obj.m
        #n = obj.n
        IO.puts("after changing")
        IO.puts(m)
        IO.puts(n)
        #Enum.each(sq,fn(x) -> IO.puts x end)

        IO.puts("im out?")      

        
        
        %{
           vals: game.vals,
           squares: sq,
           match: game.match,
           click: clicks,
           flag: fl,
           m: m,
           n: n,
        }
    end

    def two_null(sq,j,mat) do
        if(j>=16) do
            sq
        else
            if(Enum.at(sq,j) != nil && Enum.at(sq,j)!=mat) do
                sq = List.replace_at(sq,j,nil)
            end
            two_null(sq,j+1,mat)
        end
    end

    def timeout(game) do
        sq = two_null(game.squares, 0, game.match)
        %{
            vals: game.vals,
            squares: sq,
            match: game.match,
            click: game.click,
            flag: false,
            m: game.m,
            n: game.n,  
        }
        
    end

end